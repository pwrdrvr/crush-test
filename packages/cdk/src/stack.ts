import * as cdk from 'aws-cdk-lib';
import * as ecrAssets from 'aws-cdk-lib/aws-ecr-assets';
import { Construct } from 'constructs';
import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LoadTestFunctionConstruct } from './load-test-function-construct';

export interface LoadTestStackProps extends cdk.StackProps {
  /**
   * The name of the Lambda function. If not provided, a default will be used.
   */
  functionName?: string;
  /**
   * The name of the stack. If not provided, a default will be used.
   */
  stackName?: string;
  /**
   * Optional environment variables for the Lambda.
   */
  environment?: { [key: string]: string };
  /**
   * Optional: Use a public Docker image URI instead of building locally.
   */
  publicDockerImageUri?: string;
}

export class LoadTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LoadTestStackProps = {}) {
    super(scope, props.stackName ?? id, props);

    // Use a public Docker image if provided, otherwise build from local Dockerfile
    let dockerImageCode: lambda.DockerImageCode;
    if (props.publicDockerImageUri) {
      dockerImageCode = lambda.DockerImageCode.fromImageAsset(props.publicDockerImageUri);
    } else {
      const dockerImageAsset = new ecrAssets.DockerImageAsset(this, 'LoadTestImage', {
        directory: path.join(__dirname, '../../lambda'),
        file: 'docker/Dockerfile',
      });
      dockerImageCode = lambda.DockerImageCode.fromEcr(dockerImageAsset.repository, {
        tagOrDigest: dockerImageAsset.imageTag,
      });
    }

    // Create the Lambda function using the construct
    const loadTest = new LoadTestFunctionConstruct(this, 'LoadTestFunctionConstruct', {
      functionName: props.functionName,
      dockerImageCode,
      environment: props.environment,
    });

    // Output the function ARN for use in other stacks/scripts
    new cdk.CfnOutput(this, 'LoadTestFunctionArn', {
      value: loadTest.lambdaFunction.functionArn,
      description: 'ARN of the Load Test Lambda function',
      exportName: `${cdk.Stack.of(this).stackName}-LoadTestFunctionArn`,
    });
  }
}
