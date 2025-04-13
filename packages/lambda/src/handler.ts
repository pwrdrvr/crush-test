import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Handler } from 'aws-lambda';
import { spawn } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';

interface TestPayload {
  tool: 'oha' | 'k6';
  args: string[];
  env?: Record<string, string>;
  labels?: Record<string, string>;
  testProfile?: {
    s3Location?: {
      bucket: string;
      key: string;
    };
    base64Content?: string;
  };
}

const s3Client = new S3Client({});

export const handler: Handler<TestPayload> = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  // If there's a test profile, we need to get it
  let testProfileContent: string | undefined;
  if (event.testProfile) {
    if (event.testProfile.s3Location) {
      const { bucket, key } = event.testProfile.s3Location;
      const response = await s3Client.send(
        new GetObjectCommand({ Bucket: bucket, Key: key })
      );
      testProfileContent = await response.Body?.transformToString();
    } else if (event.testProfile.base64Content) {
      testProfileContent = Buffer.from(event.testProfile.base64Content, 'base64').toString('utf-8');
    }
  }

  // If we have a test profile, write it to a temporary file
  let testProfilePath: string | undefined;
  if (testProfileContent) {
    testProfilePath = '/tmp/test-profile.js';
    await promisify(require('fs').writeFile)(testProfilePath, testProfileContent);
  }

  // Prepare environment variables
  const env = {
    ...process.env,
    ...event.env,
  };

  // Execute the test tool
  let args = [...event.args];
  if (testProfilePath) {
    args.push(testProfilePath);
  }

  // If tool is oha, ensure --no-tui and -j are present at the start
  if (event.tool === 'oha') {
    const hasNoTui = args.includes('--no-tui');
    const hasJ = args.includes('-j');
    const prependArgs: string[] = [];
    if (!hasNoTui) prependArgs.push('--no-tui');
    if (!hasJ) prependArgs.push('-j');
    args = [...prependArgs, ...args];
  }

  // If tool is k6, ensure --out json is present and handle output
  let k6JsonPath = '/tmp/k6-result.json';
  let k6JsonRequested = false;
  if (event.tool === 'k6') {
    // Ensure that we save the summary output to a json file
    const hasSummaryExport = args.includes('--summary-export');
    const hasQuiet = args.includes('-q');
    const prependArgs: string[] = [];
    if (!hasSummaryExport) prependArgs.push('--summary-export', k6JsonPath);
    if (!hasQuiet) prependArgs.push('-q');
    args = [...prependArgs, ...args];
    // If the test profile is present, ensure it's the last arg (k6 expects script last)
    if (testProfilePath) {
      // Remove if already present (avoid duplicate)
      args = args.filter(arg => arg !== testProfilePath);
      args.push(testProfilePath);
    }
  }

  console.log('Running command:', event.tool, args.join(' '));
  // console.log('Environment:', env);

  // Use the cleaner runProcess helper
  const { stdout, stderr, exitCode } = await runProcess(event.tool, args, env);

  let stdoutField: { type: string; value: any };
  let summaryExportField: { type: string; value: any } | undefined = undefined;

  if (event.tool === 'oha' && stdout) {
    // With oha's -j flag, the output should be JSON
    try {
      const parsedOutput = JSON.parse(stdout);
      stdoutField = { type: 'json', value: parsedOutput };
    } catch (e) {
      console.error('Failed to parse oha JSON output:', e);
      stdoutField = { type: 'text', value: stdout };
    }
  } else if (event.tool === 'k6') {
    // Always pass through k6 stdout as text
    stdoutField = { type: 'text', value: stdout };
    try {
      if (fs.existsSync(k6JsonPath)) {
        const k6JsonRaw = fs.readFileSync(k6JsonPath, 'utf-8');
        const parsedOutput = JSON.parse(k6JsonRaw);
        summaryExportField = { type: 'json', value: parsedOutput };
      } else {
        console.error('K6 JSON output file not found:', k6JsonPath);
      }
    } catch (e) {
      console.error('Failed to parse K6 JSON output:', e);
    }
  } else {
    stdoutField = { type: 'text', value: stdout };
  }

  console.log('Returning result');

  // Prepare a copy of the input event, omitting testProfile.base64Content if present
  const requestEcho: any = { ...event };
  if (requestEcho.testProfile && requestEcho.testProfile.base64Content) {
    requestEcho.testProfile = { ...requestEcho.testProfile };
    delete requestEcho.testProfile.base64Content;
  }

  let responseBody: any = {
    stdout: stdoutField,
    ...(event.tool === 'k6' && typeof summaryExportField !== 'undefined' ? { summaryExportField } : {}),
    stderr,
    exitCode,
    request: requestEcho
  };

  return {
    statusCode: exitCode === 0 ? 200 : 500,
    body: JSON.stringify(responseBody)
  };
};

/**
 * Spawns a process and returns a Promise with stdout, stderr, and exitCode.
 */
function runProcess(
  command: string,
  args: string[],
  env: NodeJS.ProcessEnv
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { env });
    let stdout = '';
    let stderr = '';

    process.stdout.on('data', (data) => {
      const text = data.toString();
      console.log(text); // Log to CloudWatch
      stdout += text;
    });

    process.stderr.on('data', (data) => {
      const text = data.toString();
      console.error(text); // Log to CloudWatch
      stderr += text;
    });

    process.on('close', (code) => {
      console.log('Process exited with code:', code);
      resolve({
        stdout,
        stderr,
        exitCode: code ?? -1
      });
    });

    process.on('error', (error) => {
      console.error('Process error:', error);
      reject(error);
    });
  });
}
