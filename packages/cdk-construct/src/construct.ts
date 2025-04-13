import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Duration } from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';

/**
 * Properties for configuring the {@link CrushTest} construct.
 */
export interface CrushTestProps {
  /**
   * The name of the Lambda function.
   * If not provided, a default will be used.
   */
  functionName?: string;
  /**
   * The Docker image code to use for the Lambda.
   * This should be a DockerImageCode instance, typically from an ECR asset or image URI.
   */
  dockerImageCode: lambda.DockerImageCode;
  /**
   * Optional environment variables for the Lambda.
   */
  environment?: { [key: string]: string };
  /**
   * Memory size in MB for the Lambda function.
   * @default 2048
   */
  memorySize?: number;
}

/**
 * A reusable CDK construct that creates a Lambda function from a Docker image,
 * with S3 read access and configurable memory and environment.
 */
export class CrushTest extends Construct {
  /**
   * The underlying DockerImageFunction Lambda resource.
   */
  public readonly lambdaFunction: lambda.DockerImageFunction;

  /**
   * Creates a new {@link CrushTest} construct.
   * @param scope The parent construct.
   * @param id The construct ID.
   * @param props Configuration properties.
   */
  constructor(scope: Construct, id: string, props: CrushTestProps) {
    super(scope, id);

    this.lambdaFunction = new lambda.DockerImageFunction(this, 'LoadTestFunction', {
      functionName: props.functionName,
      code: props.dockerImageCode,
      timeout: Duration.minutes(15),
      memorySize: props.memorySize ?? 2048,
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
        ...props.environment,
      },
      logRetention: logs.RetentionDays.ONE_WEEK,
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
