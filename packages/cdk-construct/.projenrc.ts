import { awscdk } from 'projen';
import { NodePackageManager } from 'projen/lib/javascript';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Harold Hunt',
  authorAddress: 'harold@pwrdrvr.com',
  authorName: 'PwrDrvr LLC',
  cdkVersion: '2.189.0',
  defaultReleaseBranch: 'main',
  description: 'CDK Construct for the Crush Test project',
  jsiiVersion: '~5.8.0',
  license: 'MIT',
  name: '@pwrdrvr/crush-test-cdk',
  projenrcTs: true,
  packageManager: NodePackageManager.NPM,
  repositoryUrl: 'https://github.com/pwrdrvr/crush-test.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();