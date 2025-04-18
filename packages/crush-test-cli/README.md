# crush-test-cli

Proxy CLI for [k6](https://k6.io/) and [oha](https://github.com/hatoo/oha) that runs tests via an AWS Lambda function.

## Usage

Set the environment variable `CRUSH_TEST_LAMBDA` to your Lambda ARN, function name, or function_name:alias.

```sh
export CRUSH_TEST_LAMBDA="my-lambda-function:prod"
```

Run k6 or oha as usual (using npx):

```sh
npx k6 run k6/ping.js --vus 10 --duration 10s
npx oha -n 1000 https://example.com/
```

All arguments are proxied to the Lambda, which executes the tool and returns stdout and a JSON summary.

## Features

- Supports both `k6` and `oha` commands.
- For `k6`, the test profile file is base64-encoded and sent to Lambda.
- Prints stdout and, for k6, the summary export JSON.
- Works with Lambda ARNs, function names, or aliases/versions.

## Requirements

- Node.js 18+
- AWS credentials with permission to invoke the Lambda

## Development

- Build: `npm run build`
- Entry points: `bin/k6.js`, `bin/oha.js`
- Shared logic: `src/cli.ts`
