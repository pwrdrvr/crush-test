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
  const args = [...event.args];
  if (testProfilePath) {
    args.push(testProfilePath);
  }

  return new Promise((resolve, reject) => {
    const process = spawn(event.tool, args, { env });
    let stdout = '';
    let stderr = '';

    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    process.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Process exited with code ${code}\nStderr: ${stderr}`));
        return;
      }

      resolve({
        statusCode: 200,
        body: JSON.stringify({
          stdout,
          stderr,
          exitCode: code
        })
      });
    });

    process.on('error', (error) => {
      reject(error);
    });
  });
};