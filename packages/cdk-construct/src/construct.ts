import { existsSync } from 'fs';
import * as path from 'path';
import { Duration } from 'aws-cdk-lib';
import * as ecrAssets from 'aws-cdk-lib/aws-ecr-assets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';


/**
 * Properties for configuring the {@link CrushTest} construct.
 */
export interface CrushTestProps {
  /**
   * The name of the Lambda function.
   * If not provided, a default will be used.
   */
  readonly functionName?: string;
  /**
   * The Docker image code to use for the Lambda.
   * This should be a DockerImageCode instance, typically from an ECR asset or image URI.
   */
  readonly dockerImageCode?: lambda.DockerImageCode;
  /**
   * Optional environment variables for the Lambda.
   */
  readonly environment?: { [key: string]: string };
  /**
   * Memory size in MB for the Lambda function.
   * @default 2048
   */
  readonly memorySize?: number;
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

    let dockerImageCode: lambda.DockerImageCode;
    if (props.dockerImageCode) {
      dockerImageCode = props.dockerImageCode;
    } else {
      if (existsSync(path.join(__dirname, '../.projenrc.ts'))) {
        // Local source build / deploy
        const dockerImageAsset = new ecrAssets.DockerImageAsset(this, 'LoadTestImage', {
          directory: path.join(__dirname, '../../lambda'),
          file: 'docker/Dockerfile',
        });
        dockerImageCode = lambda.DockerImageCode.fromEcr(dockerImageAsset.repository, {
          tagOrDigest: dockerImageAsset.imageTag,
        });
      } else {
        // Distributed NPM package with bundled Dockerfile and Lambda handler
        const dockerImageAsset = new ecrAssets.DockerImageAsset(this, 'LoadTestImage', {
          directory: path.join(__dirname, './lambda'),
          file: 'docker/Dockerfile',
        });
        dockerImageCode = lambda.DockerImageCode.fromEcr(dockerImageAsset.repository, {
          tagOrDigest: dockerImageAsset.imageTag,
        });
      }
    }

    this.lambdaFunction = new lambda.DockerImageFunction(this, 'LoadTestFunction', {
      functionName: props.functionName,
      code: dockerImageCode,
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
      }),
    );

  }
}
