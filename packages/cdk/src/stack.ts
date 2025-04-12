import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class LoadTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda function
    const loadTestFunction = new lambda.Function(this, 'LoadTestFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset('../lambda/dist'),
      timeout: cdk.Duration.minutes(15),
      memorySize: 1024,
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
      },
      // Use custom Lambda layer with oha and k6 installed
      layers: [
        lambda.LayerVersion.fromLayerVersionArn(
          this,
          'TestToolsLayer',
          // TODO: Replace with your layer ARN containing oha and k6
          'arn:aws:lambda:us-east-2:123456789012:layer:oha-k6-tools:1'
        ),
      ],
    });

    // Grant Lambda permission to read from S3 (for test profiles)
    loadTestFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: ['arn:aws:s3:::*/*'],
      })
    );

    // Output the function ARN for use in other stacks/scripts
    new cdk.CfnOutput(this, 'LoadTestFunctionArn', {
      value: loadTestFunction.functionArn,
      description: 'ARN of the Load Test Lambda function',
      exportName: 'LoadTestFunctionArn',
    });
  }
}