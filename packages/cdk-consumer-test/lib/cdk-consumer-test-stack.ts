import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CrushTest } from '@pwrdrvr/crush-test-cdk';

export class CdkConsumerTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Instantiate the CrushTest construct from the packaged module
    new CrushTest(this, 'TestCrushTest', {});
  }
}
