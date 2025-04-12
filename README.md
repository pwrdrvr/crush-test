## Run with Default Tokio Threads

```bash
aws lambda invoke --cli-read-timeout 120 --function-name arn:aws:lambda:us-east-2:220761759939:function:LoadTestStack-LoadTestFunctionDE82A114-yYU1QAftidby --payload '{"tool":"oha","args":["--no-tui","-j","-c","20","-z","60s","https://lambdadispatch-pr-274.ghpublic.pwrdrvr.com/ping"]}' --cli-binary-format raw-in-base64-out response.json && cat response.json
 ```

 ## Run with 1 Tokio Thread

 ```bash
aws lambda invoke --cli-read-timeout 120 --function-name arn:aws:lambda:us-east-2:220761759939:function:LoadTestStack-LoadTestFunctionDE82A114-yYU1QAftidby --payload '{"tool":"oha","args":["--no-tui","-j","-c","20","-z","60s","https://lambdadispatch-pr-274.ghpublic.pwrdrvr.com/ping"],"env":{"TOKIO_WORKER_THREADS":"1"}}' --cli-binary-format raw-in-base64-out response.json && cat response.json
```

