# @pwrdrvr/crush-test-cdk

A CDK construct for deploying the Crush Test Lambda, enabling you to run high-performance load tests (using [`oha`](https://github.com/hatoo/oha) or [`k6`](https://k6.io/)) directly from AWS Lambda.

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

## 🏷️ Default Naming Conventions

- By default, the Lambda function name is set by the AWS CDK as `${stackName}-${id}`.
- You can override the function name using the `functionName` property in the construct props.

---

## 🧩 Creating Multiple Lambda Variants (Manual Approach)

To run load tests with different CPU/RAM configurations, create three instances of the `CrushTest` construct with different `memorySize` values. AWS Lambda allocates vCPUs based on memory size (1 vCPU per 1769 MB, with a little extra RAM recommended to avoid throttling).

| Variant | Memory (MB) | vCPUs (approx) | Example ID / Name         |
|---------|-------------|----------------|---------------------------|
| Small   | 1769        | 1              | `LoadTestSmall`           |
| Medium  | 3538        | 2              | `LoadTestMedium`          |
| Large   | 7076        | 4              | `LoadTestLarge`           |

**Example (TypeScript):**
```ts
import { CrushTest } from '@pwrdrvr/crush-test-cdk';

// 1 vCPU
new CrushTest(stack, 'LoadTestSmall', { memorySize: 1769 });

// 2 vCPU
new CrushTest(stack, 'LoadTestMedium', { memorySize: 3538 });

// 4 vCPU
new CrushTest(stack, 'LoadTestLarge', { memorySize: 7076 });
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

---

## 📊 Architecture Diagram

```mermaid
graph TD
    A[CDK Stack] --> B1[CrushTest (1 vCPU)]
    A[CDK Stack] --> B2[CrushTest (2 vCPU)]
    A[CDK Stack] --> B3[CrushTest (4 vCPU)]
    B1 --> L1[Lambda Function (1769 MB)]
    B2 --> L2[Lambda Function (3538 MB)]
    B3 --> L3[Lambda Function (7076 MB)]