import { awscdk } from 'projen';
import { NodePackageManager, NpmAccess } from 'projen/lib/javascript';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'PwrDrvr LLC',
  authorAddress: 'harold@pwrdrvr.com',
  authorOrganization: true,
  cdkVersion: '2.189.0',
  copyrightOwner: 'PwrDrvr LLC',
  copyrightPeriod: '2025',
  defaultReleaseBranch: 'main',
  description: 'CDK Construct for the Crush Test project',
  jsiiVersion: '~5.8.0',
  license: 'MIT',
  name: '@pwrdrvr/crush-test-cdk',
  projenrcTs: true,
  packageManager: NodePackageManager.NPM,
  repositoryUrl: 'https://github.com/pwrdrvr/crush-test.git',
  keywords: ['awscdk', 'lambda', 'load-test', 'oha', 'k6'],
  npmAccess: NpmAccess.PUBLIC,
  minNodeVersion: '20.0.0',
  // deps: [],                /* Runtime dependencies of this module. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

// Clear directory for the Lambda
project.compileTask.exec('rm -rf ./lib/lambda');

// Make directory for the Lambda
project.compileTask.exec('mkdir -p ./lib/lambda');

// TODO: esbuild the Lambda

// Copy the esbuild output of the Lambda
project.compileTask.exec('cp -R ../lambda/dist ./lib/lambda/');

// Copy the Dockerfile
project.compileTask.exec('cp -R ../lambda/docker ./lib/lambda/');

// Allow the lambda dist to be packaged
// Have to use this function instead of npmIgnoreOptions
// npmIgnoreOptions puts this override above `dist` which
// has no effect.  This function puts the override at the bottom.
project.addPackageIgnore('!/lib/lambda/dist/*');

project.synth();