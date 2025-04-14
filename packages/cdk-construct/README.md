# @pwrdrvr/crush-test-cdk

A CDK construct for deploying the Crush Test Lambda, enabling you to run high-performance load tests (using [`oha`](https://github.com/hatoo/oha) or [`k6`](https://k6.io/)) directly from AWS Lambda.

**Key use case:**  
When running performance tests as part of CI/CD (e.g., GitHub Actions), you can use this construct to run your load tests in the same AWS Region as your deployed service. This ensures the most consistent and lowest round-trip time (RTT) between the test tool and the service being tested, avoiding the variability and latency of running tests from external GitHub Runners.

---

## 📖 API Reference

See the full API documentation in [API.md](https://github.com/pwrdrvr/crush-test/blob/main/packages/cdk-construct/API.md).

---

## 🚀 Installation

```sh
npm install @pwrdrvr/crush-test-cdk
# or
yarn add @pwrdrvr/crush-test-cdk
```

---

## 🐳 How the Lambda is Packaged

- The Lambda function is packaged as a Docker image.
- The image is built automatically from the contents of the `lambda` directory and the included `Dockerfile`.
- No manual Docker build or ECR push is required; the construct handles all packaging and deployment steps.

---

## 🏷️ Naming Conventions

- By default, the Lambda function name is set by the AWS CDK as `${stackName}-${id}`.
- You can override the function name using the `functionName` property in the construct props.

---

## 🧩 Usage Example

Below is a minimal example of how to use the `CrushTest` construct in your own stack. For a more complete example, see the [example stack](../cdk/src/stack.ts).

```ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CrushTest } from '@pwrdrvr/crush-test-cdk';

export class MyLoadTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Deploy a single CrushTest Lambda with 2GB memory (default)
    new CrushTest(this, 'LoadTestFunction', {
      // functionName: 'my-custom-function-name', // Optional
      // environment: { KEY: 'value' },           // Optional
      // memorySize: 2048,                        // Optional, default is 2048
    });
  }
}
```

### Example: Multiple Lambda Functions with Different Memory Sizes

The example app (`packages/cdk/src/stack.ts`) shows how to deploy multiple Lambda functions with different memory sizes:

```ts
// 2 GB Lambda (default)
new CrushTest(this, 'LoadTestFunction2GB', { memorySize: 2048 });

// 4 GB Lambda
new CrushTest(this, 'LoadTestFunction4GB', { memorySize: 4096 });

// 8 GB Lambda
new CrushTest(this, 'LoadTestFunction8GB', { memorySize: 8192 });
```

---

## ⚙️ Additional Configuration

- **Environment Variables:** Pass custom environment variables using the `environment` prop.
- **Custom Docker Image:** Optionally provide your own Docker image via the `dockerImageCode` prop.
- **Function Name:** Override the default function name with the `functionName` prop.

See [API.md](https://github.com/pwrdrvr/crush-test/blob/main/packages/cdk-construct/API.md) for all available options.

---

## 🛠️ Prerequisites

- [AWS CDK v2](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [Node.js](https://nodejs.org/) (see `package.json` for supported versions)

---

## 📝 License

MIT License. See [LICENSE](./LICENSE) for details.