import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CrushTest } from '../../cdk-construct/src';

export interface CrushTestStackProps extends cdk.StackProps {
  /**
   * The name of the Lambda function. If not provided, a default will be used.
   */
  readonly functionName?: string;
  /**
   * The name of the stack. If not provided, a default will be used.
   */
  readonly stackName?: string;
  /**
   * Optional environment variables for the Lambda.
   */
  readonly environment?: { [key: string]: string };
}

export class CrushTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CrushTestStackProps = {}) {
    super(scope, props.stackName ?? id, props);

    // 2 GB Lambda (default, no suffix)
    const loadTest2gb = new CrushTest(this, 'LoadTestFunction2GB', {
      functionName: props.functionName,
      environment: props.environment,
      memorySize: 2048,
    });

    // 4 GB Lambda (-4gb suffix)
    const loadTest4gb = new CrushTest(this, 'LoadTestFunction4GB', {
      functionName: props.functionName ? `${props.functionName}-4gb` : undefined,
      environment: props.environment,
      memorySize: 4096,
    });

    // 8 GB Lambda (-8gb suffix)
    const loadTest8gb = new CrushTest(this, 'LoadTestFunction8GB', {
      functionName: props.functionName ? `${props.functionName}-8gb` : undefined,
      environment: props.environment,
      memorySize: 8192,
    });

    // Output the function ARNs for use in other stacks/scripts
    new cdk.CfnOutput(this, 'LoadTestFunction2GBArn', {
      value: loadTest2gb.lambdaFunction.functionArn,
      description: 'ARN of the 2GB Load Test Lambda function',
      exportName: `${cdk.Stack.of(this).stackName}-Function2GBArn`,
    });
    new cdk.CfnOutput(this, 'LoadTestFunction4GBArn', {
      value: loadTest4gb.lambdaFunction.functionArn,
      description: 'ARN of the 4GB Load Test Lambda function',
      exportName: `${cdk.Stack.of(this).stackName}-Function4GBArn`,
    });
    new cdk.CfnOutput(this, 'LoadTestFunction8GBArn', {
      value: loadTest8gb.lambdaFunction.functionArn,
      description: 'ARN of the 8GB Load Test Lambda function',
      exportName: `${cdk.Stack.of(this).stackName}-Function8GBArn`,
    });
  }
}
