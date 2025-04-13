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


# Latest Smoke Test Results

<!-- perf-table:start -->

### 🚀 Performance Test Results

| Metric | Deploy Oha | Deploy K6 | Deploy Packaged Oha | Deploy Packaged K6 |
|--------|-----------:|----------:|--------------------:|-------------------:|
| Total Requests | 10 | 1,601 | 10 | 1,594 |
| Overall RPS | 2,713.2 | 533.3 | 2,742.2 | 530.9 |
| Min Response Time (ms) | 1.19 | 1.22 | 1.85 | 1.29 |
| p50 Response Time (ms) | 4.68 | 1.85 | 4.98 | 2.72 |
| p90 Response Time (ms) | 16.20 | 2.91 | 15.49 | 4.72 |
| p95 Response Time (ms) | 26.77 | 3.18 | 20.42 | 7.95 |

<details><summary>Deploy Oha Raw JSON</summary>

```json
{
  "stdout": {
    "type": "json",
    "value": {
      "summary": {
        "successRate": 1,
        "total": 10.00201409,
        "slowest": 0.213890559,
        "fastest": 0.001186884,
        "average": 0.007366404410259242,
        "requestsPerSec": 2713.1535464573617,
        "totalData": 108468,
        "sizePerRequest": 4,
        "sizePerSec": 10844.615796776987
      },
      "responseTimeHistogram": {
        "0.001186884": 1,
        "0.0224572515": 25427,
        "0.043727619": 1505,
        "0.06499798650000001": 163,
        "0.086268354": 0,
        "0.1075387215": 3,
        "0.12880908900000002": 12,
        "0.1500794565": 5,
        "0.171349824": 0,
        "0.1926201915": 0,
        "0.213890559": 1
      },
      "latencyPercentiles": {
        "p10": 0.003015914,
        "p25": 0.003736952,
        "p50": 0.004684763,
        "p75": 0.006238045,
        "p90": 0.016199571,
        "p95": 0.026765601,
        "p99": 0.041747631,
        "p99.9": 0.059340313,
        "p99.99": 0.132216717
      },
      "rps": {
        "mean": 3328.5780567526535,
        "stddev": 1997.3577116849808,
        "max": 31841.556415138926,
        "min": 10.61021612935984,
        "percentiles": {
          "p10": 75.58336183455941,
          "p25": 2242.6735060376996,
          "p50": 3905.838056142399,
          "p75": 4561.128240677998,
          "p90": 4974.971658538766,
          "p95": 5344.801358401547,
          "p99": 5885.831269613681,
          "p99.9": 31841.556415138926,
          "p99.99": 31841.556415138926
        }
      },
      "details": {
        "DNSDialup": {
          "average": 0.0071934959,
          "fastest": 0.004953581,
          "slowest": 0.009730497
        },
        "DNSLookup": {
          "average": 0.000024978850000000002,
          "fastest": 0.000005327,
          "slowest": 0.000155689
        }
      },
      "statusCodeDistribution": {
        "200": 27117
      },
      "errorDistribution": {
        "aborted due to deadline": 20
      }
    }
  },
  "stderr": "",
  "exitCode": 0,
  "request": {
    "tool": "oha",
    "labels": {
      "test": "oha",
      "type": "ping-c20-z10s"
    },
    "args": [
      "--no-tui",
      "-j",
      "-c",
      "20",
      "-z",
      "10s",
      "https://lambdadispatch.ghpublic.pwrdrvr.com/ping"
    ]
  }
}
```
</details>


<details><summary>Deploy K6 Raw JSON</summary>

```json
{
  "stdout": {
    "type": "text",
    "value": "\n\n  █ TOTAL RESULTS \n\n    HTTP\n    http_req_duration.......................................................: avg=2.2ms  min=1.22ms med=1.84ms max=33.53ms p(90)=2.91ms p(95)=3.18ms\n      { expected_response:true }............................................: avg=2.2ms  min=1.22ms med=1.84ms max=33.53ms p(90)=2.91ms p(95)=3.18ms\n    http_req_failed.........................................................: 0.00%  0 out of 1601\n    http_reqs...............................................................: 1601   533.304178/s\n\n    EXECUTION\n    dropped_iterations......................................................: 3      0.999321/s\n    iteration_duration......................................................: avg=2.29ms min=1.26ms med=1.91ms max=33.65ms p(90)=2.99ms p(95)=3.32ms\n    iterations..............................................................: 1601   533.304178/s\n    vus.....................................................................: 3      min=0         max=3 \n    vus_max.................................................................: 12     min=10        max=12\n\n    NETWORK\n    data_received...........................................................: 568 kB 189 kB/s\n    data_sent...............................................................: 64 kB  21 kB/s\n\n\n\n"
  },
  "summaryExportField": {
    "type": "json",
    "value": {
      "root_group": {
        "name": "",
        "path": "",
        "id": "d41d8cd98f00b204e9800998ecf8427e",
        "groups": {},
        "checks": {}
      },
      "metrics": {
        "http_req_duration{expected_response:true}": {
          "max": 33.537959,
          "p(90)": 2.911753,
          "p(95)": 3.182462,
          "avg": 2.2044901255465352,
          "min": 1.224538,
          "med": 1.848837
        },
        "data_sent": {
          "rate": 21337.49683227811,
          "count": 64056
        },
        "iterations": {
          "count": 1601,
          "rate": 533.3041780391728
        },
        "http_req_blocked": {
          "avg": 0.024036554653341705,
          "min": 0.000184,
          "med": 0.000403,
          "max": 6.272785,
          "p(90)": 0.000482,
          "p(95)": 0.000527
        },
        "iteration_duration": {
          "avg": 2.294439189256718,
          "min": 1.266633,
          "med": 1.914221,
          "max": 33.652883,
          "p(90)": 2.998593,
          "p(95)": 3.324194
        },
        "http_req_duration": {
          "med": 1.848837,
          "max": 33.537959,
          "p(90)": 2.911753,
          "p(95)": 3.182462,
          "avg": 2.2044901255465352,
          "min": 1.224538
        },
        "data_received": {
          "count": 567642,
          "rate": 189085.47797033863
        },
        "http_req_receiving": {
          "avg": 0.07509237976264839,
          "min": 0.011987,
          "med": 0.044455,
          "max": 1.813908,
          "p(90)": 0.202668,
          "p(95)": 0.252383
        },
        "dropped_iterations": {
          "count": 3,
          "rate": 0.9993207583494806
        },
        "http_req_connecting": {
          "p(95)": 0,
          "avg": 0.005692668332292317,
          "min": 0,
          "med": 0,
          "max": 1.663698,
          "p(90)": 0
        },
        "http_req_sending": {
          "max": 0.474906,
          "p(90)": 0.066086,
          "p(95)": 0.086132,
          "avg": 0.05022589943785146,
          "min": 0.021327,
          "med": 0.046263
        },
        "http_req_waiting": {
          "avg": 2.0791718463460342,
          "min": 1.136917,
          "med": 1.728472,
          "max": 33.391385,
          "p(90)": 2.760363,
          "p(95)": 3.051044
        },
        "http_reqs": {
          "count": 1601,
          "rate": 533.3041780391728
        },
        "http_req_tls_handshaking": {
          "p(95)": 0,
          "avg": 0.015222116177389134,
          "min": 0,
          "med": 0,
          "max": 2.764855,
          "p(90)": 0
        },
        "http_req_failed": {
          "passes": 0,
          "fails": 1601,
          "value": 0
        },
        "vus": {
          "value": 3,
          "min": 0,
          "max": 3
        },
        "vus_max": {
          "value": 12,
          "min": 10,
          "max": 12
        }
      }
    }
  },
  "stderr": "",
  "exitCode": 0,
  "request": {
    "tool": "k6",
    "labels": {
      "test": "k6",
      "type": "ping-3-seconds"
    },
    "args": [
      "run"
    ],
    "env": {
      "TARGET_URL": "https://lambdadispatch.ghpublic.pwrdrvr.com/ping"
    },
    "testProfile": {}
  }
}
```
</details>


<details><summary>Deploy Packaged Oha Raw JSON</summary>

```json
{
  "stdout": {
    "type": "json",
    "value": {
      "summary": {
        "successRate": 1,
        "total": 10.001866781,
        "slowest": 0.061784319,
        "fastest": 0.001847351,
        "average": 0.007293492222242458,
        "requestsPerSec": 2742.188093536856,
        "totalData": 109628,
        "sizePerRequest": 4,
        "sizePerSec": 10960.753867293486
      },
      "responseTimeHistogram": {
        "0.001847351": 1,
        "0.0078410478": 21529,
        "0.0138347446": 2395,
        "0.0198284414": 1996,
        "0.0258221382": 684,
        "0.031815835": 371,
        "0.0378095318": 239,
        "0.043803228599999994": 150,
        "0.0497969254": 29,
        "0.0557906222": 2,
        "0.061784319": 11
      },
      "latencyPercentiles": {
        "p10": 0.003273848,
        "p25": 0.003990378,
        "p50": 0.004978182,
        "p75": 0.00716865,
        "p90": 0.015491764,
        "p95": 0.020420507,
        "p99": 0.035675622,
        "p99.9": 0.044972405,
        "p99.99": 0.06156816
      },
      "rps": {
        "mean": 3152.162402127595,
        "stddev": 1647.1343181554973,
        "max": 11445.510784537595,
        "min": 22.05228681001344,
        "percentiles": {
          "p10": 91.48808573531501,
          "p25": 2292.58330196951,
          "p50": 3710.298645029866,
          "p75": 4278.643608852526,
          "p90": 4759.288840733146,
          "p95": 5042.966691204981,
          "p99": 5553.036122499594,
          "p99.9": 7006.749368108979,
          "p99.99": 11445.510784537595
        }
      },
      "details": {
        "DNSDialup": {
          "average": 0.020352968399999997,
          "fastest": 0.016843849,
          "slowest": 0.025097309
        },
        "DNSLookup": {
          "average": 0.000021155399999999997,
          "fastest": 0.000005124,
          "slowest": 0.000135136
        }
      },
      "statusCodeDistribution": {
        "200": 27407
      },
      "errorDistribution": {
        "aborted due to deadline": 20
      }
    }
  },
  "stderr": "",
  "exitCode": 0,
  "request": {
    "tool": "oha",
    "labels": {
      "test": "oha",
      "type": "ping-c20-z10s"
    },
    "args": [
      "--no-tui",
      "-j",
      "-c",
      "20",
      "-z",
      "10s",
      "https://lambdadispatch.ghpublic.pwrdrvr.com/ping"
    ]
  }
}
```
</details>


<details><summary>Deploy Packaged K6 Raw JSON</summary>

```json
{
  "stdout": {
    "type": "text",
    "value": "\n\n  █ TOTAL RESULTS \n\n    HTTP\n    http_req_duration.......................................................: avg=3.46ms min=1.29ms med=2.71ms max=35ms    p(90)=4.72ms p(95)=7.95ms\n      { expected_response:true }............................................: avg=3.46ms min=1.29ms med=2.71ms max=35ms    p(90)=4.72ms p(95)=7.95ms\n    http_req_failed.........................................................: 0.00%  0 out of 1594\n    http_reqs...............................................................: 1594   530.861507/s\n\n    EXECUTION\n    dropped_iterations......................................................: 11     3.663411/s\n    iteration_duration......................................................: avg=3.6ms  min=1.35ms med=2.78ms max=62.54ms p(90)=4.95ms p(95)=8.63ms\n    iterations..............................................................: 1594   530.861507/s\n    vus.....................................................................: 2      min=0         max=4 \n    vus_max.................................................................: 20     min=10        max=20\n\n    NETWORK\n    data_received...........................................................: 602 kB 201 kB/s\n    data_sent...............................................................: 68 kB  23 kB/s\n\n\n\n"
  },
  "summaryExportField": {
    "type": "json",
    "value": {
      "root_group": {
        "name": "",
        "path": "",
        "id": "d41d8cd98f00b204e9800998ecf8427e",
        "groups": {},
        "checks": {}
      },
      "metrics": {
        "vus": {
          "min": 0,
          "max": 4,
          "value": 2
        },
        "http_reqs": {
          "count": 1594,
          "rate": 530.8615071648419
        },
        "data_received": {
          "count": 602358,
          "rate": 200607.70121254696
        },
        "data_sent": {
          "count": 68084,
          "rate": 22674.513710044605
        },
        "http_req_receiving": {
          "med": 0.055987999999999996,
          "max": 2.264728,
          "p(90)": 0.2394267,
          "p(95)": 0.26207765,
          "avg": 0.09708391279799254,
          "min": 0.012233
        },
        "iterations": {
          "count": 1594,
          "rate": 530.8615071648419
        },
        "http_req_connecting": {
          "min": 0,
          "med": 0,
          "max": 1.053101,
          "p(90)": 0,
          "p(95)": 0,
          "avg": 0.00841784504391468
        },
        "http_req_waiting": {
          "p(95)": 7.816209149999979,
          "avg": 3.3168086348808057,
          "min": 1.230917,
          "med": 2.5776944999999998,
          "max": 34.852251,
          "p(90)": 4.526624500000002
        },
        "http_req_failed": {
          "passes": 0,
          "fails": 1594,
          "value": 0
        },
        "vus_max": {
          "value": 20,
          "min": 10,
          "max": 20
        },
        "http_req_sending": {
          "p(90)": 0.0671273,
          "p(95)": 0.08545445,
          "avg": 0.05162189209535747,
          "min": 0.022294,
          "med": 0.0476105,
          "max": 0.339476
        },
        "http_req_duration{expected_response:true}": {
          "avg": 3.465514439774154,
          "min": 1.293768,
          "med": 2.717559,
          "max": 35.000337,
          "p(90)": 4.7227655,
          "p(95)": 7.954373649999987
        },
        "http_req_tls_handshaking": {
          "med": 0,
          "max": 2.325998,
          "p(90)": 0,
          "p(95)": 0,
          "avg": 0.02442196988707654,
          "min": 0
        },
        "dropped_iterations": {
          "count": 11,
          "rate": 3.6634106517021716
        },
        "http_req_duration": {
          "avg": 3.465514439774154,
          "min": 1.293768,
          "med": 2.717559,
          "max": 35.000337,
          "p(90)": 4.7227655,
          "p(95)": 7.954373649999987
        },
        "http_req_blocked": {
          "avg": 0.06988244667503132,
          "min": 0.000218,
          "med": 0.000407,
          "max": 57.632573,
          "p(90)": 0.0004924,
          "p(95)": 0.0006515499999999988
        },
        "iteration_duration": {
          "avg": 3.603754885194483,
          "min": 1.35015,
          "med": 2.7849585,
          "max": 62.549455,
          "p(90)": 4.9502796,
          "p(95)": 8.639698899999994
        }
      }
    }
  },
  "stderr": "",
  "exitCode": 0,
  "request": {
    "tool": "k6",
    "labels": {
      "test": "k6",
      "type": "ping-3-seconds"
    },
    "args": [
      "run"
    ],
    "env": {
      "TARGET_URL": "https://lambdadispatch.ghpublic.pwrdrvr.com/ping"
    },
    "testProfile": {}
  }
}
```
</details>

<!-- perf-table:end -->

