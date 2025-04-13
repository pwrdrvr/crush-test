import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CrushTest } from '@pwrdrvr/crush-test-cdk';

export interface CdkConsumerTestStackProps extends cdk.StackProps {
  /**
   * The name of the Lambda function. If not provided, a default will be used.
   */
  readonly functionName?: string;
}

export class CdkConsumerTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CdkConsumerTestStackProps = {}) {
    super(scope, props.stackName ?? id, props);

    // Instantiate the CrushTest construct from the packaged module
    new CrushTest(this, 'TestCrushTest', {
      functionName: props.functionName,
    });
  }
}
