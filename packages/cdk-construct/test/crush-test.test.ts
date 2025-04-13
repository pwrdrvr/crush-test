import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CrushTest } from '../src/construct';

describe('CrushTest Construct', () => {
  it('creates a DockerImageFunction Lambda with expected properties', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');

    new CrushTest(stack, 'TestFunction', {
      functionName: 'MyTestFunction',
      environment: { FOO: 'bar' },
      memorySize: 4096,
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Function', {
      FunctionName: 'MyTestFunction',
      MemorySize: 4096,
      Environment: {
        Variables: {
          NODE_OPTIONS: '--enable-source-maps',
          FOO: 'bar',
        },
      },
      Timeout: 900,
    });
  });
});
