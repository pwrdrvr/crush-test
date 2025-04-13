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
| Total Requests | 10 | 1,587 | 10 | 1,595 |
| Overall RPS | 2,766.4 | 528.4 | 2,715.3 | 531.4 |
| Min Response Time (ms) | 1.48 | 1.52 | 1.51 | 1.48 |
| p50 Response Time (ms) | 4.65 | 3.56 | 5.10 | 2.25 |
| p90 Response Time (ms) | 15.12 | 5.25 | 15.40 | 3.61 |
| p95 Response Time (ms) | 27.72 | 7.59 | 22.80 | 5.04 |

<details><summary>Deploy Oha Raw JSON</summary>

```json
{
  "stdout": {
    "type": "json",
    "value": {
      "summary": {
        "successRate": 1,
        "total": 10.003119191,
        "slowest": 0.071233484,
        "fastest": 0.001477021,
        "average": 0.007225086946841218,
        "requestsPerSec": 2766.4370954309866,
        "totalData": 110612,
        "sizePerRequest": 4,
        "sizePerSec": 11057.750876298642
      },
      "responseTimeHistogram": {
        "0.001477021": 1,
        "0.008452667300000001": 23334,
        "0.015428313600000002": 1618,
        "0.022403959900000003": 1004,
        "0.029379606200000002": 516,
        "0.036355252500000004": 657,
        "0.04333089880000001": 314,
        "0.05030654510000001": 178,
        "0.05728219140000001": 16,
        "0.0642578377": 1,
        "0.071233484": 14
      },
      "latencyPercentiles": {
        "p10": 0.003054799,
        "p25": 0.003704982,
        "p50": 0.004653315,
        "p75": 0.006276435,
        "p90": 0.015124434,
        "p95": 0.027722344,
        "p99": 0.041193928,
        "p99.9": 0.050760319,
        "p99.99": 0.070767424
      },
      "rps": {
        "mean": 3363.255468604574,
        "stddev": 1814.429050241622,
        "max": 15850.400398723235,
        "min": 22.924504220343284,
        "percentiles": {
          "p10": 91.0751540331312,
          "p25": 2385.1167058344454,
          "p50": 3933.256866785725,
          "p75": 4585.0498284246205,
          "p90": 5016.15149596472,
          "p95": 5282.216645646153,
          "p99": 5805.985930021884,
          "p99.9": 15850.400398723235,
          "p99.99": 15850.400398723235
        }
      },
      "details": {
        "DNSDialup": {
          "average": 0.00551527125,
          "fastest": 0.003160439,
          "slowest": 0.008334131
        },
        "DNSLookup": {
          "average": 0.000014503750000000003,
          "fastest": 0.000005183,
          "slowest": 0.000080371
        }
      },
      "statusCodeDistribution": {
        "200": 27653
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
    "value": "\n\n  █ TOTAL RESULTS \n\n    HTTP\n    http_req_duration.......................................................: avg=3.84ms min=1.52ms med=3.55ms max=21.06ms p(90)=5.25ms p(95)=7.59ms\n      { expected_response:true }............................................: avg=3.84ms min=1.52ms med=3.55ms max=21.06ms p(90)=5.25ms p(95)=7.59ms\n    http_req_failed.........................................................: 0.00%  0 out of 1587\n    http_reqs...............................................................: 1587   528.373531/s\n\n    EXECUTION\n    dropped_iterations......................................................: 17     5.659956/s\n    iteration_duration......................................................: avg=3.98ms min=1.56ms med=3.63ms max=29.61ms p(90)=5.59ms p(95)=8.26ms\n    iterations..............................................................: 1587   528.373531/s\n    vus.....................................................................: 3      min=0         max=3 \n    vus_max.................................................................: 15     min=10        max=15\n\n    NETWORK\n    data_received...........................................................: 577 kB 192 kB/s\n    data_sent...............................................................: 65 kB  22 kB/s\n\n\n\n"
  },
  "summaryExportField": {
    "type": "json",
    "value": {
      "root_group": {
        "groups": {},
        "checks": {},
        "name": "",
        "path": "",
        "id": "d41d8cd98f00b204e9800998ecf8427e"
      },
      "metrics": {
        "http_req_waiting": {
          "p(95)": 7.337707099999986,
          "avg": 3.7048904228103328,
          "min": 1.444208,
          "med": 3.434774,
          "max": 20.901682,
          "p(90)": 5.079736800000001
        },
        "http_req_failed": {
          "passes": 0,
          "fails": 1587,
          "value": 0
        },
        "data_sent": {
          "count": 65157,
          "rate": 21693.27924053987
        },
        "vus_max": {
          "value": 15,
          "min": 10,
          "max": 15
        },
        "iteration_duration": {
          "med": 3.63154,
          "max": 29.611535,
          "p(90)": 5.590500600000003,
          "p(95)": 8.264975099999974,
          "avg": 3.9814384461247565,
          "min": 1.560744
        },
        "data_received": {
          "count": 577013,
          "rate": 192109.89048638876
        },
        "http_req_blocked": {
          "p(90)": 0.00047,
          "p(95)": 0.000564,
          "avg": 0.051666633270321276,
          "min": 0.000192,
          "med": 0.000406,
          "max": 25.119601
        },
        "http_req_duration": {
          "avg": 3.8487845677378676,
          "min": 1.523364,
          "med": 3.558046,
          "max": 21.068284,
          "p(90)": 5.2534876000000015,
          "p(95)": 7.593239699999984
        },
        "vus": {
          "max": 3,
          "value": 3,
          "min": 0
        },
        "dropped_iterations": {
          "count": 17,
          "rate": 5.6599559078714154
        },
        "iterations": {
          "rate": 528.3735309289374,
          "count": 1587
        },
        "http_req_connecting": {
          "p(90)": 0,
          "p(95)": 0,
          "avg": 0.010877934467548835,
          "min": 0,
          "med": 0,
          "max": 1.489798
        },
        "http_req_tls_handshaking": {
          "avg": 0.037428739760554504,
          "min": 0,
          "med": 0,
          "max": 23.438071,
          "p(90)": 0,
          "p(95)": 0
        },
        "http_reqs": {
          "count": 1587,
          "rate": 528.3735309289374
        },
        "http_req_sending": {
          "p(90)": 0.09009500000000001,
          "p(95)": 0.11533209999999994,
          "avg": 0.0606955400126024,
          "min": 0.014406,
          "med": 0.050706,
          "max": 1.450559
        },
        "http_req_receiving": {
          "p(95)": 0.23222449999999994,
          "avg": 0.08319860491493379,
          "min": 0.01224,
          "med": 0.04125,
          "max": 7.503485,
          "p(90)": 0.14136280000000026
        },
        "http_req_duration{expected_response:true}": {
          "max": 21.068284,
          "p(90)": 5.2534876000000015,
          "p(95)": 7.593239699999984,
          "avg": 3.8487845677378676,
          "min": 1.523364,
          "med": 3.558046
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
        "total": 10.002540533,
        "slowest": 0.059564858,
        "fastest": 0.001513633,
        "average": 0.007366146482387671,
        "requestsPerSec": 2715.3101664916794,
        "totalData": 108560,
        "sizePerRequest": 4,
        "sizePerSec": 10853.242697876904
      },
      "responseTimeHistogram": {
        "0.001513633": 1,
        "0.0073187554999999994": 21410,
        "0.013123878": 2278,
        "0.0189290005": 1744,
        "0.024734123": 529,
        "0.0305392455": 460,
        "0.036344368": 363,
        "0.0421494905": 277,
        "0.047954613": 63,
        "0.0537597355": 13,
        "0.059564858": 2
      },
      "latencyPercentiles": {
        "p10": 0.00335238,
        "p25": 0.004119005,
        "p50": 0.005103596,
        "p75": 0.00673077,
        "p90": 0.015396507,
        "p95": 0.022804128,
        "p99": 0.037926214,
        "p99.9": 0.046499836,
        "p99.99": 0.052635215
      },
      "rps": {
        "mean": 3180.3759900087166,
        "stddev": 1683.1018505683085,
        "max": 14780.752176054615,
        "min": 24.408546144735094,
        "percentiles": {
          "p10": 91.82976781302338,
          "p25": 2472.0228810442004,
          "p50": 3725.291229815731,
          "p75": 4284.136346494507,
          "p90": 4690.424868501406,
          "p95": 4943.323385013238,
          "p99": 5713.99330294565,
          "p99.9": 14780.752176054615,
          "p99.99": 14780.752176054615
        }
      },
      "details": {
        "DNSDialup": {
          "average": 0.0050661268,
          "fastest": 0.002785877,
          "slowest": 0.007327118
        },
        "DNSLookup": {
          "average": 0.0000155958,
          "fastest": 0.000005274,
          "slowest": 0.00008737
        }
      },
      "statusCodeDistribution": {
        "200": 27140
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
    "value": "\n\n  █ TOTAL RESULTS \n\n    HTTP\n    http_req_duration.......................................................: avg=2.86ms min=1.47ms med=2.25ms max=31.78ms p(90)=3.61ms p(95)=5.03ms\n      { expected_response:true }............................................: avg=2.86ms min=1.47ms med=2.25ms max=31.78ms p(90)=3.61ms p(95)=5.03ms\n    http_req_failed.........................................................: 0.00%  0 out of 1595\n    http_reqs...............................................................: 1595   531.408514/s\n\n    EXECUTION\n    dropped_iterations......................................................: 9      2.998543/s\n    iteration_duration......................................................: avg=2.97ms min=1.53ms med=2.33ms max=31.82ms p(90)=3.8ms  p(95)=5.55ms\n    iterations..............................................................: 1595   531.408514/s\n    vus.....................................................................: 5      min=0         max=5 \n    vus_max.................................................................: 17     min=10        max=17\n\n    NETWORK\n    data_received...........................................................: 589 kB 196 kB/s\n    data_sent...............................................................: 67 kB  22 kB/s\n\n\n\n"
  },
  "summaryExportField": {
    "type": "json",
    "value": {
      "metrics": {
        "http_req_tls_handshaking": {
          "med": 0,
          "max": 3.231438,
          "p(90)": 0,
          "p(95)": 0,
          "avg": 0.024283389341692788,
          "min": 0
        },
        "dropped_iterations": {
          "count": 9,
          "rate": 2.9985433406290993
        },
        "http_req_failed": {
          "passes": 0,
          "fails": 1595,
          "value": 0
        },
        "data_sent": {
          "count": 66515,
          "rate": 22160.901144660504
        },
        "iterations": {
          "count": 1595,
          "rate": 531.4085142559348
        },
        "http_reqs": {
          "count": 1595,
          "rate": 531.4085142559348
        },
        "data_received": {
          "count": 588799,
          "rate": 196171.03560211923
        },
        "http_req_connecting": {
          "max": 3.050675,
          "p(90)": 0,
          "p(95)": 0,
          "avg": 0.013099983699059561,
          "min": 0,
          "med": 0
        },
        "vus_max": {
          "value": 17,
          "min": 10,
          "max": 17
        },
        "http_req_waiting": {
          "p(90)": 3.4801812000000014,
          "p(95)": 4.772436999999998,
          "avg": 2.7453817322884024,
          "min": 1.392239,
          "med": 2.135884,
          "max": 31.72289
        },
        "http_req_receiving": {
          "max": 1.938131,
          "p(90)": 0.1371058000000002,
          "p(95)": 0.23084889999999997,
          "avg": 0.06426374106583074,
          "min": 0.013334,
          "med": 0.037961
        },
        "http_req_duration": {
          "avg": 2.863543188714731,
          "min": 1.479718,
          "med": 2.254415,
          "max": 31.786038,
          "p(90)": 3.612614,
          "p(95)": 5.036289399999999
        },
        "http_req_sending": {
          "p(90)": 0.07370160000000002,
          "p(95)": 0.09675709999999998,
          "avg": 0.053897715360501426,
          "min": 0.017625,
          "med": 0.049088,
          "max": 0.396188
        },
        "http_req_blocked": {
          "avg": 0.0402256056426331,
          "min": 0.00021,
          "med": 0.000405,
          "max": 5.985862,
          "p(90)": 0.000464,
          "p(95)": 0.0005301999999999998
        },
        "vus": {
          "max": 5,
          "value": 5,
          "min": 0
        },
        "http_req_duration{expected_response:true}": {
          "max": 31.786038,
          "p(90)": 3.612614,
          "p(95)": 5.036289399999999,
          "avg": 2.863543188714731,
          "min": 1.479718,
          "med": 2.254415
        },
        "iteration_duration": {
          "p(95)": 5.557635599999999,
          "avg": 2.974503461442008,
          "min": 1.530254,
          "med": 2.337475,
          "max": 31.825459,
          "p(90)": 3.803859200000001
        }
      },
      "root_group": {
        "name": "",
        "path": "",
        "id": "d41d8cd98f00b204e9800998ecf8427e",
        "groups": {},
        "checks": {}
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

