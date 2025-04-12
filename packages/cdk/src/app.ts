import * as cdk from 'aws-cdk-lib';
import { LoadTestStack } from './stack';

const app = new cdk.App();

// Main stack (always present)
const mainStackName = 'crush-test';
const mainFunctionName = 'crush-test-lambda';

new LoadTestStack(app, mainStackName, {
  stackName: mainStackName,
  functionName: mainFunctionName,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-2',
  },
});

// PR stack (only if PR_NUMBER is set)
const prNumber = process.env.PR_NUMBER;
if (prNumber) {
  const prStackName = `crush-test-pr-${prNumber}`;
  const prFunctionName = `crush-test-lambda-pr-${prNumber}`;
  new LoadTestStack(app, prStackName, {
    stackName: prStackName,
    functionName: prFunctionName,
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION || 'us-east-2',
    },
  });
}
