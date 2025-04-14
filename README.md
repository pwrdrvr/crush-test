# Crush Test: Regionally Accurate Load Testing with AWS Lambda

Crush Test enables you to run high-performance load tests (using [`oha`](https://github.com/hatoo/oha) or [`k6`](https://k6.io/)) directly from AWS Lambda, in the same AWS Region as your deployed service. This is especially useful when running performance tests as part of CI/CD (e.g., GitHub Actions), allowing you to avoid the network variability and latency of running tests from external runners.

---

## 📊 Architecture Overview

```mermaid
flowchart TD
    GHA[GitHub Actions Runner<br>us-east-1] -- "aws lambda invoke" --> LAMBDA[Crush Test Lambda<br>us-east-2]
    LAMBDA -- "HTTP(s) test" --> SERVICE[Tested Service<br>us-east-2]
```

- **GitHub Actions Runner** (in `us-east-1`) uses the AWS CLI to invoke the Crush Test Lambda.
- **Crush Test Lambda** (in `us-east-2`) runs the load test tool in the same region as the service under test, ensuring the lowest and most consistent RTT.

---

## 🚀 Quick Start

| Resource                | Location / Link                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------|
| CDK Construct README    | [packages/cdk-construct/README.md](./packages/cdk-construct/README.md)                          |
| CDK Construct API Docs  | [packages/cdk-construct/API.md](./packages/cdk-construct/API.md)                                |

### Install the CDK Construct

```sh
npm install @pwrdrvr/crush-test-cdk
# or
yarn add @pwrdrvr/crush-test-cdk
```

---

## 🧩 Example: Invoking Crush Test Lambda from GitHub Actions

You can invoke the Lambda from a GitHub Actions runner (or any machine with AWS CLI access):

```sh
aws lambda invoke \
  --cli-read-timeout 120 \
  --function-name <your-lambda-name> \
  --payload '{"tool":"k6","args":["run"],"env":{"TARGET_URL":"https://service.example.com/route"},"testProfile":{"base64Content":"<base64-encoded-k6-script>"},"labels":{"gha_run":"123","test":"api"}}' \
  response-k6.json
```

- **tool**: `"k6"` or `"oha"`
- **args**: Arguments for the tool (e.g., `["run","-"]` for k6)
- **stdin**: For k6, provide the test script as a base64-encoded string (see below)
- **labels**: Any key-value pairs; echoed back in the response for easy identification

#### Encoding a k6 Profile as Base64

```sh
base64 -w 0 my-k6-script.js
```

Then use the output as the value for `"stdin"` in your payload.

#### Example k6 Invocation

```sh
aws lambda invoke \
  --function-name <your-lambda-name> \
  --payload '{"tool":"k6","args":["run"],"env":{"TARGET_URL":"https://service.example.com/route"},"testProfile":{"base64Content":"<base64-encoded-k6-script>"},"labels":{"gha_run":"123","test":"api"}}' \
  response-k6.json
```

#### Example oha Invocation

```sh
aws lambda invoke \
  --function-name <your-lambda-name> \
  --payload '{"tool":"oha","args":["-n","1000","-c","20","https://service.example.com/route"],"env":{"TOKIO_WORKER_THREADS":"1"},"labels":{"gha_run":"123","test":"api"}}' \
  response-oha.json
```

---

## 🏷️ Label Echoing

Any labels you include in the `labels` field of your payload are echoed back in the Lambda's response. This makes it easy to correlate response files with the requests that generated them, especially when running multiple tests in parallel.

---

## ⚠️ CPU Limit and Throttling

**Important:**  
Take care to avoid hitting the CPU limit of the Lambda function. If the Lambda is throttled due to CPU exhaustion, the timing and accuracy of your performance tests will be impacted. For best results, allocate sufficient memory (and thus CPU) to your Lambda function for your expected test load.

---

## 📦 Example Responses

Full example oha and k6 response files are included at the bottom of this README.

---

## 📝 License

MIT License. See [LICENSE](./packages/cdk-construct/LICENSE) for details.

# Latest Smoke Test Results

<!-- perf-table:start -->

### 🚀 Performance Test Results

| Metric | Deploy Oha | Deploy K6 | Deploy Packaged Oha | Deploy Packaged K6 |
|--------|-----------:|----------:|--------------------:|-------------------:|
| Total Requests | 10 | 1,598 | 10 | 1,601 |
| Overall RPS | 2,733.6 | 532.0 | 2,738.4 | 533.4 |
| Min Response Time (ms) | 1.37 | 1.47 | 1.57 | 1.42 |
| p50 Response Time (ms) | 4.79 | 2.86 | 4.87 | 2.56 |
| p90 Response Time (ms) | 15.41 | 3.95 | 15.39 | 3.88 |
| p95 Response Time (ms) | 26.91 | 5.40 | 25.54 | 5.32 |

<!-- perf-table:end -->
