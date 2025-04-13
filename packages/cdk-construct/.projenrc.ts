import { awscdk } from "projen";
const project = new awscdk.AwsCdkConstructLibrary({
  author: "Harold Hunt",
  authorAddress: "harold@pwrdrvr.com",
  authorName: "PwrDrvr LLC",
  cdkVersion: "2.136.0",
  defaultReleaseBranch: "main",
  description: "Reusable CDK construct for a DockerImageFunction Lambda with S3 read access",
  jsiiVersion: "~5.8.0",
  name: "cdk-construct",
  projenrcTs: true,
  repositoryUrl: "https://github.com/pwrdrvr/crush-test.git",

  // deps: [],                /* Runtime dependencies of this module. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();