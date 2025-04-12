import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Duration } from 'aws-cdk-lib';

export interface LoadTestFunctionConstructProps {
  /**
   * The name of the Lambda function. If not provided, a default will be used.
   */
  functionName?: string;
  /**
   * The Docker image URI or ECR asset to use for the Lambda.
   * If not provided, the stack should supply one.
   */
  dockerImageCode: lambda.DockerImageCode;
  /**
   * Optional environment variables for the Lambda.
   */
  environment?: { [key: string]: string };
}

export class LoadTestFunctionConstruct extends Construct {
  public readonly lambdaFunction: lambda.DockerImageFunction;

  constructor(scope: Construct, id: string, props: LoadTestFunctionConstructProps) {
    super(scope, id);

    this.lambdaFunction = new lambda.DockerImageFunction(this, 'LoadTestFunction', {
      functionName: props.functionName,
      code: props.dockerImageCode,
      timeout: Duration.minutes(15),
      memorySize: 2048,
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
        ...props.environment,
      },
    });

    // Grant Lambda permission to read from S3 (for test profiles)
    this.lambdaFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: ['arn:aws:s3:::*/*'],
      })
    );
  }
}
