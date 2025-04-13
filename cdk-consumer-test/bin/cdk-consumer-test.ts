#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkConsumerTestStack } from '../lib/cdk-consumer-test-stack';

const app = new cdk.App();

// Main stack (always present)
const mainStackName = 'crush-test-construct-test';
const mainFunctionName = 'crush-test-construct-test-lambda';

new CdkConsumerTestStack(app, mainStackName, {
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
  const prStackName = `crush-test-construct-test-pr-${prNumber}`;
  const prFunctionName = `crush-test-construct-test-lambda-pr-${prNumber}`;
  new CdkConsumerTestStack(app, prStackName, {
    stackName: prStackName,
    functionName: prFunctionName,
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION || 'us-east-2',
    },
  });
}
