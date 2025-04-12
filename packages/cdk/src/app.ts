import * as cdk from 'aws-cdk-lib';
import { LoadTestStack } from './stack';

const app = new cdk.App();
new LoadTestStack(app, 'LoadTestStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-2',
  },
});