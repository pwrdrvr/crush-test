# `oha`

## Run with Default Tokio Threads

```bash
aws lambda invoke --cli-read-timeout 120 --function-name crush-test-lambda --payload '{"tool":"oha","labels":{"test":"oha","type":"ping-c20-z60s"},"args":["--no-tui","-j","-c","20","-z","60s","https://lambdadispatch-pr-274.ghpublic.pwrdrvr.com/ping"]}' --cli-binary-format raw-in-base64-out response.json && cat response.json
 ```

 ## Run with 1 Tokio Thread

 ```bash
aws lambda invoke --cli-read-timeout 120 --function-name crush-test-lambda --payload '{"tool":"oha","labels":{"test":"oha","type":"ping-c20-z60s-1thread"},"args":["--no-tui","-j","-c","20","-z","60s","https://lambdadispatch-pr-274.ghpublic.pwrdrvr.com/ping"],"env":{"TOKIO_WORKER_THREADS":"1"}}' --cli-binary-format raw-in-base64-out response.json && cat response.json
```

# `k6`

## Simple Run - 3 seconds

```bash
aws lambda invoke --cli-read-timeout 120 \
  --function-name crush-test-lambda \
  --payload '{
    "tool":"k6",
    "labels": {
      "test": "k6",
      "type": "ping-3-seconds"
    },
    "args":["run"],
    "env":{"TARGET_URL":"https://lambdadispatch-pr-274.ghpublic.pwrdrvr.com/ping"},
    "testProfile":{"base64Content":"aW1wb3J0IGh0dHAgZnJvbSAiazYvaHR0cCI7CgpleHBvcnQgY29uc3Qgb3B0aW9ucyA9IHsKICBkaXNjYXJkUmVzcG9uc2VCb2RpZXM6IHRydWUsCiAgc2NlbmFyaW9zOiB7CiAgICBkaXNwYXRjaDogewogICAgICBleGVjdXRvcjogInJhbXBpbmctYXJyaXZhbC1yYXRlIiwKICAgICAgcHJlQWxsb2NhdGVkVlVzOiAxMCwKICAgICAgbWF4VlVzOiAxMDAwLAogICAgICBzdGFydFJhdGU6IDIwLAogICAgICB0aW1lVW5pdDogIjFzIiwKICAgICAgc3RhZ2VzOiBbCiAgICAgICAgLy8geyB0YXJnZXQ6IDEsIGR1cmF0aW9uOiAiMTBzIiB9LAogICAgICAgIHsgdGFyZ2V0OiAxMCwgZHVyYXRpb246ICIwcyIgfSwKICAgICAgICB7IHRhcmdldDogMTAwLCBkdXJhdGlvbjogIjFzIiB9LAogICAgICAgIHsgdGFyZ2V0OiAxMDAwLCBkdXJhdGlvbjogIjFzIiB9LAogICAgICAgIHsgdGFyZ2V0OiAxMDAwLCBkdXJhdGlvbjogIjFzIiB9LAogICAgICAgIC8vIHsgdGFyZ2V0OiAxMDAwMCwgZHVyYXRpb246ICIxMHMiIH0sCiAgICAgICAgLy8geyB0YXJnZXQ6IDEwMDAwLCBkdXJhdGlvbjogIjVtIiB9LAogICAgICAgIC8vIHsgdGFyZ2V0OiAyMDAwLCBkdXJhdGlvbjogIjYwcyIgfSwKICAgICAgICAvLyB7IHRhcmdldDogMjAwMCwgZHVyYXRpb246ICI1bSIgfSwKICAgICAgICAvLyB7IHRhcmdldDogMzAwMCwgZHVyYXRpb246ICI2MHMiIH0sCiAgICAgICAgLy8geyB0YXJnZXQ6IDMwMDAsIGR1cmF0aW9uOiAiNW0iIH0sCiAgICAgICAgeyB0YXJnZXQ6IDAsIGR1cmF0aW9uOiAiMCIgfSwKICAgICAgXSwKICAgICAgZXhlYzogImRpc3BhdGNoIiwKICAgIH0sCiAgfSwKfTsKCi8vCi8vIFJlYWRzIGEgcmFuZG9tIH4xLjUgS0IgcmVjb3JkIG91dCBvZiBEeW5hbW9EQgovLyBUaGlzIGlzIHZlcnkgZmFzdCBhbmQgYSB2ZXJ5IHNtYWxsIHJlc3BvbnNlIHNpemUKLy8gVGhpcyBpcyBlc3NlbnRpYWxseSB0aGUgd29yc3QgY2FzZSBzY2VuYXJpbyBmb3IgbGFtYmRhIGRpc3BhdGNoCi8vIFRoaXMgYWxzbyBjb250YWlucyBhIDUwIG1zIHNsZWVwIGluIHRoZSBgL3JlYWRgIGhhbmRsZXIgdG8gc2ltdWxhdGUgY2FsbGluZyBhbiB1cHN0cmVhbSB0aGF0IHRha2VzIGxvbmdlcgovLyBUaGlzIG1lYW4gdGhhdCB0aGUgQ1BVIG9uIExhbWJkYSBEaXNwYXRjaCB3aWxsIGJlIHVuZGVydXRpbGl6ZWQgdW5sZXNzCi8vIHRoZSBudW1iZXIgb2YgY29uY3VycmVudCByZXF1ZXN0cyBpcyBxdWl0ZSBoaWdoCi8vCmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaCgpIHsKICAvLyBVc2UgVEFSR0VUX1VSTCBmcm9tIGVudmlyb25tZW50LCBmYWxsYmFjayB0byBkZWZhdWx0CiAgY29uc3QgdXJsID0gX19FTlYuVEFSR0VUX1VSTCB8fCAiaHR0cDovLzEyNy4wLjAuMTo1MDAxL3BpbmciOwogIGh0dHAuZ2V0KHVybCk7Cn0K"}
  }' \
  --cli-binary-format raw-in-base64-out response.json && cat response.json
```

## Simple Run - 12 seconds

```bash
aws lambda invoke --cli-read-timeout 120 \
  --function-name crush-test-lambda \
  --payload '{
    "tool":"k6",
    "labels": {
      "test": "k6",
      "type": "ping-12-seconds"
    },
    "args":["run"],
    "env":{"TARGET_URL":"https://lambdadispatch-pr-274.ghpublic.pwrdrvr.com/ping"},
    "testProfile":{"base64Content":"aW1wb3J0IGh0dHAgZnJvbSAiazYvaHR0cCI7CgpleHBvcnQgY29uc3Qgb3B0aW9ucyA9IHsKICBkaXNjYXJkUmVzcG9uc2VCb2RpZXM6IHRydWUsCiAgc2NlbmFyaW9zOiB7CiAgICBkaXNwYXRjaDogewogICAgICBleGVjdXRvcjogInJhbXBpbmctYXJyaXZhbC1yYXRlIiwKICAgICAgcHJlQWxsb2NhdGVkVlVzOiAxMCwKICAgICAgbWF4VlVzOiAxMDAwLAogICAgICBzdGFydFJhdGU6IDIwLAogICAgICB0aW1lVW5pdDogIjFzIiwKICAgICAgc3RhZ2VzOiBbCiAgICAgICAgLy8geyB0YXJnZXQ6IDEsIGR1cmF0aW9uOiAiMTBzIiB9LAogICAgICAgIHsgdGFyZ2V0OiAxMCwgZHVyYXRpb246ICIwcyIgfSwKICAgICAgICB7IHRhcmdldDogMTAwLCBkdXJhdGlvbjogIjFzIiB9LAogICAgICAgIHsgdGFyZ2V0OiA1MDAsIGR1cmF0aW9uOiAiMXMiIH0sCiAgICAgICAgeyB0YXJnZXQ6IDEwMDAsIGR1cmF0aW9uOiAiMTBzIiB9LAogICAgICAgIC8vIHsgdGFyZ2V0OiAxMDAwMCwgZHVyYXRpb246ICI1bSIgfSwKICAgICAgICAvLyB7IHRhcmdldDogMjAwMCwgZHVyYXRpb246ICI2MHMiIH0sCiAgICAgICAgLy8geyB0YXJnZXQ6IDIwMDAsIGR1cmF0aW9uOiAiNW0iIH0sCiAgICAgICAgLy8geyB0YXJnZXQ6IDMwMDAsIGR1cmF0aW9uOiAiNjBzIiB9LAogICAgICAgIC8vIHsgdGFyZ2V0OiAzMDAwLCBkdXJhdGlvbjogIjVtIiB9LAogICAgICAgIHsgdGFyZ2V0OiAwLCBkdXJhdGlvbjogIjAiIH0sCiAgICAgIF0sCiAgICAgIGV4ZWM6ICJkaXNwYXRjaCIsCiAgICB9LAogIH0sCn07CgovLwovLyBSZWFkcyBhIHJhbmRvbSB+MS41IEtCIHJlY29yZCBvdXQgb2YgRHluYW1vREIKLy8gVGhpcyBpcyB2ZXJ5IGZhc3QgYW5kIGEgdmVyeSBzbWFsbCByZXNwb25zZSBzaXplCi8vIFRoaXMgaXMgZXNzZW50aWFsbHkgdGhlIHdvcnN0IGNhc2Ugc2NlbmFyaW8gZm9yIGxhbWJkYSBkaXNwYXRjaAovLyBUaGlzIGFsc28gY29udGFpbnMgYSA1MCBtcyBzbGVlcCBpbiB0aGUgYC9yZWFkYCBoYW5kbGVyIHRvIHNpbXVsYXRlIGNhbGxpbmcgYW4gdXBzdHJlYW0gdGhhdCB0YWtlcyBsb25nZXIKLy8gVGhpcyBtZWFuIHRoYXQgdGhlIENQVSBvbiBMYW1iZGEgRGlzcGF0Y2ggd2lsbCBiZSB1bmRlcnV0aWxpemVkIHVubGVzcwovLyB0aGUgbnVtYmVyIG9mIGNvbmN1cnJlbnQgcmVxdWVzdHMgaXMgcXVpdGUgaGlnaAovLwpleHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2goKSB7CiAgLy8gVXNlIFRBUkdFVF9VUkwgZnJvbSBlbnZpcm9ubWVudCwgZmFsbGJhY2sgdG8gZGVmYXVsdAogIGNvbnN0IHVybCA9IF9fRU5WLlRBUkdFVF9VUkwgfHwgImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS9waW5nIjsKICBodHRwLmdldCh1cmwpOwp9Cg=="}
  }' \
  --cli-binary-format raw-in-base64-out response.json && cat response.json
```

## Simple Run - 110 seconds

```bash
aws lambda invoke --cli-read-timeout 120 \
  --function-name crush-test-lambda \
  --payload '{
    "tool":"k6",
    "labels": {
      "test": "k6",
      "type": "ping-110-seconds"
    },
    "args":["run"],
    "env":{"TARGET_URL":"https://lambdadispatch-pr-274.ghpublic.pwrdrvr.com/ping"},
    "testProfile":{"base64Content":"aW1wb3J0IGh0dHAgZnJvbSAiazYvaHR0cCI7CgpleHBvcnQgY29uc3Qgb3B0aW9ucyA9IHsKICBkaXNjYXJkUmVzcG9uc2VCb2RpZXM6IHRydWUsCiAgc2NlbmFyaW9zOiB7CiAgICBkaXNwYXRjaDogewogICAgICBleGVjdXRvcjogInJhbXBpbmctYXJyaXZhbC1yYXRlIiwKICAgICAgcHJlQWxsb2NhdGVkVlVzOiAxMCwKICAgICAgbWF4VlVzOiAxMDAwLAogICAgICBzdGFydFJhdGU6IDIwLAogICAgICB0aW1lVW5pdDogIjFzIiwKICAgICAgc3RhZ2VzOiBbCiAgICAgICAgeyB0YXJnZXQ6IDEwLCBkdXJhdGlvbjogIjBzIiB9LAogICAgICAgIHsgdGFyZ2V0OiAxMDAsIGR1cmF0aW9uOiAiMXMiIH0sCiAgICAgICAgeyB0YXJnZXQ6IDUwMCwgZHVyYXRpb246ICIxcyIgfSwKICAgICAgICB7IHRhcmdldDogMTAwMCwgZHVyYXRpb246ICIxMHMiIH0sCiAgICAgICAgeyB0YXJnZXQ6IDIwMDAsIGR1cmF0aW9uOiAiMzBzIiB9LAogICAgICAgIHsgdGFyZ2V0OiAxMDAwLCBkdXJhdGlvbjogIjMwcyIgfSwKICAgICAgICB7IHRhcmdldDogMjAwMCwgZHVyYXRpb246ICIzMHMiIH0sCiAgICAgICAgeyB0YXJnZXQ6IDAsIGR1cmF0aW9uOiAiMCIgfSwKICAgICAgXSwKICAgICAgZXhlYzogImRpc3BhdGNoIiwKICAgIH0sCiAgfSwKfTsKCi8vIEhpdCBhbiBhcmJpcnRhcnkgVVJMIHdpdGggYSBHRVQgcmVxdWVzdCBhbmQgZGlzY2FyZCB0aGUgYm9keQpleHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2goKSB7CiAgLy8gVXNlIFRBUkdFVF9VUkwgZnJvbSBlbnZpcm9ubWVudCwgZmFsbGJhY2sgdG8gZGVmYXVsdAogIGNvbnN0IHVybCA9IF9fRU5WLlRBUkdFVF9VUkwgfHwgImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS9waW5nIjsKICBodHRwLmdldCh1cmwpOwp9Cg=="}
  }' \
  --cli-binary-format raw-in-base64-out response.json && cat response.json
```