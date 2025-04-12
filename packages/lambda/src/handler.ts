import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Handler } from 'aws-lambda';
import { spawn } from 'child_process';
import { promisify } from 'util';

interface TestPayload {
  tool: 'oha' | 'k6';
  args: string[];
  env?: Record<string, string>;
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

  console.log('Running command:', event.tool, args.join(' '));
  // console.log('Environment:', env);

  // Use the cleaner runProcess helper
  const { stdout, stderr, exitCode } = await runProcess(event.tool, args, env);

  // With oha's -j flag, the output should be JSON
  let stdoutField: { type: string; value: any };
  if (event.tool === 'oha' && stdout) {
    try {
      const parsedOutput = JSON.parse(stdout);
      stdoutField = { type: 'json', value: parsedOutput };
    } catch (e) {
      console.error('Failed to parse oha JSON output:', e);
      stdoutField = { type: 'text', value: stdout };
    }
  } else {
    stdoutField = { type: 'text', value: stdout };
  }

  console.log('Returning result');

  return {
    statusCode: exitCode === 0 ? 200 : 500,
    body: JSON.stringify({
      stdout: stdoutField,
      stderr,
      exitCode
    })
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
