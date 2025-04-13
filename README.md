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
| Total Requests | 10 | 1,592 | 10 | 1,597 |
| Overall RPS | 2,754.5 | 529.9 | 2,648.1 | 531.2 |
| Min Response Time (ms) | 1.53 | 1.63 | 1.47 | 1.45 |
| p50 Response Time (ms) | 4.79 | 3.17 | 4.90 | 2.62 |
| p90 Response Time (ms) | 15.72 | 5.44 | 17.18 | 4.62 |
| p95 Response Time (ms) | 25.80 | 8.98 | 27.17 | 6.93 |

<details><summary>Deploy Oha Raw JSON</summary>

```json
{
  "stdout": {
    "type": "json",
    "value": {
      "summary": {
        "successRate": 1,
        "total": 10.003229588,
        "slowest": 0.082056274,
        "fastest": 0.0015303,
        "average": 0.007237240965787785,
        "requestsPerSec": 2754.510406624489,
        "totalData": 110136,
        "sizePerRequest": 4,
        "sizePerSec": 11010.044209334206
      },
      "responseTimeHistogram": {
        "0.0015303": 1,
        "0.0095828974": 23793,
        "0.0176354948": 1366,
        "0.0256880922": 983,
        "0.0337406896": 885,
        "0.041793287": 244,
        "0.0498458844": 208,
        "0.0578984818": 23,
        "0.0659510792": 9,
        "0.0740036766": 3,
        "0.082056274": 19
      },
      "latencyPercentiles": {
        "p10": 0.00319999,
        "p25": 0.003851845,
        "p50": 0.004793433,
        "p75": 0.00634032,
        "p90": 0.015721785,
        "p95": 0.025797145,
        "p99": 0.040878992,
        "p99.9": 0.063786038,
        "p99.99": 0.08029239
      },
      "rps": {
        "mean": 3285.3887522888017,
        "stddev": 1643.6963486514048,
        "max": 8560.452847952707,
        "min": 13.571626852896893,
        "percentiles": {
          "p10": 87.97237315593418,
          "p25": 2356.680358622371,
          "p50": 3923.5957199407676,
          "p75": 4467.087615222861,
          "p90": 4853.982105794731,
          "p95": 5063.426505781803,
          "p99": 5513.859545455278,
          "p99.9": 8560.452847952707,
          "p99.99": 8560.452847952707
        }
      },
      "details": {
        "DNSDialup": {
          "average": 0.008476619500000001,
          "fastest": 0.005860697,
          "slowest": 0.011124357
        },
        "DNSLookup": {
          "average": 0.000025243050000000006,
          "fastest": 0.000005467,
          "slowest": 0.000168297
        }
      },
      "statusCodeDistribution": {
        "200": 27534
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
    "value": "\n\n  █ TOTAL RESULTS \n\n    HTTP\n    http_req_duration.......................................................: avg=3.73ms min=1.62ms med=3.17ms max=25.9ms  p(90)=5.44ms p(95)=8.98ms\n      { expected_response:true }............................................: avg=3.73ms min=1.62ms med=3.17ms max=25.9ms  p(90)=5.44ms p(95)=8.98ms\n    http_req_failed.........................................................: 0.00%  0 out of 1592\n    http_reqs...............................................................: 1592   529.887627/s\n\n    EXECUTION\n    dropped_iterations......................................................: 13     4.326972/s\n    iteration_duration......................................................: avg=3.85ms min=1.67ms med=3.24ms max=26.06ms p(90)=5.76ms p(95)=9.61ms\n    iterations..............................................................: 1592   529.887627/s\n    vus.....................................................................: 4      min=1         max=4 \n    vus_max.................................................................: 17     min=10        max=17\n\n    NETWORK\n    data_received...........................................................: 587 kB 195 kB/s\n    data_sent...............................................................: 66 kB  22 kB/s\n\n\n\n"
  },
  "summaryExportField": {
    "type": "json",
    "value": {
      "metrics": {
        "data_sent": {
          "count": 66407,
          "rate": 22103.170629413646
        },
        "iteration_duration": {
          "min": 1.677258,
          "med": 3.2448575,
          "max": 26.06736,
          "p(90)": 5.7664192000000005,
          "p(95)": 9.616788699999994,
          "avg": 3.8525818636934703
        },
        "iterations": {
          "count": 1592,
          "rate": 529.8876269373187
        },
        "http_req_tls_handshaking": {
          "avg": 0.02789871293969849,
          "min": 0,
          "med": 0,
          "max": 4.911805,
          "p(90)": 0,
          "p(95)": 0
        },
        "vus_max": {
          "max": 17,
          "value": 17,
          "min": 10
        },
        "vus": {
          "value": 4,
          "min": 1,
          "max": 4
        },
        "data_received": {
          "count": 587129,
          "rate": 195422.35710809106
        },
        "http_req_sending": {
          "med": 0.0493615,
          "max": 4.425189,
          "p(90)": 0.0800732,
          "p(95)": 0.10867229999999999,
          "avg": 0.059333063442210975,
          "min": 0.016336
        },
        "dropped_iterations": {
          "count": 13,
          "rate": 4.326971828005743
        },
        "http_req_blocked": {
          "max": 9.608598,
          "p(90)": 0.000463,
          "p(95)": 0.0005111499999999987,
          "avg": 0.04518698115577882,
          "min": 0.000188,
          "med": 0.0004
        },
        "http_req_waiting": {
          "avg": 3.5845063649497493,
          "min": 1.491419,
          "med": 3.042729,
          "max": 25.6234,
          "p(90)": 5.229105700000001,
          "p(95)": 8.822497499999995
        },
        "http_req_failed": {
          "passes": 0,
          "fails": 1592,
          "value": 0
        },
        "http_req_duration": {
          "avg": 3.733298138190953,
          "min": 1.629161,
          "med": 3.170279,
          "max": 25.908088,
          "p(90)": 5.444760300000002,
          "p(95)": 8.982030399999996
        },
        "http_req_duration{expected_response:true}": {
          "p(90)": 5.444760300000002,
          "p(95)": 8.982030399999996,
          "avg": 3.733298138190953,
          "min": 1.629161,
          "med": 3.170279,
          "max": 25.908088
        },
        "http_req_connecting": {
          "p(90)": 0,
          "p(95)": 0,
          "avg": 0.013527554648241206,
          "min": 0,
          "med": 0,
          "max": 5.961533
        },
        "http_req_receiving": {
          "avg": 0.08945870979899503,
          "min": 0.012551,
          "med": 0.047002,
          "max": 4.93276,
          "p(90)": 0.1923613000000001,
          "p(95)": 0.24495909999999968
        },
        "http_reqs": {
          "count": 1592,
          "rate": 529.8876269373187
        }
      },
      "root_group": {
        "checks": {},
        "name": "",
        "path": "",
        "id": "d41d8cd98f00b204e9800998ecf8427e",
        "groups": {}
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
        "total": 10.002236267,
        "slowest": 0.06818081,
        "fastest": 0.001469837,
        "average": 0.007552185547247537,
        "requestsPerSec": 2648.107812388671,
        "totalData": 105868,
        "sizePerRequest": 4,
        "sizePerSec": 10584.433038168303
      },
      "responseTimeHistogram": {
        "0.001469837": 1,
        "0.0081409343": 21766,
        "0.0148120316": 1616,
        "0.021483128900000002": 1308,
        "0.0281542262": 551,
        "0.0348253235": 603,
        "0.0414964208": 384,
        "0.0481675181": 187,
        "0.0548386154": 37,
        "0.0615097127": 13,
        "0.06818081": 1
      },
      "latencyPercentiles": {
        "p10": 0.00317634,
        "p25": 0.003911448,
        "p50": 0.004904512,
        "p75": 0.006536416,
        "p90": 0.017177178,
        "p95": 0.027165092,
        "p99": 0.040956283,
        "p99.9": 0.050660531,
        "p99.99": 0.061412065
      },
      "rps": {
        "mean": 3268.3354616459437,
        "stddev": 3283.4874631787325,
        "max": 88685.67824851701,
        "min": 23.20216461346481,
        "percentiles": {
          "p10": 73.49852076877106,
          "p25": 2160.454263286169,
          "p50": 3811.443560555877,
          "p75": 4386.717562338661,
          "p90": 4756.818773200078,
          "p95": 4962.615993394866,
          "p99": 5474.583601560916,
          "p99.9": 88685.67824851701,
          "p99.99": 88685.67824851701
        }
      },
      "details": {
        "DNSDialup": {
          "average": 0.0086337579,
          "fastest": 0.005905589,
          "slowest": 0.011541793
        },
        "DNSLookup": {
          "average": 0.000024638849999999995,
          "fastest": 0.000005499,
          "slowest": 0.000157825
        }
      },
      "statusCodeDistribution": {
        "200": 26467
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
    "value": "\n\n  █ TOTAL RESULTS \n\n    HTTP\n    http_req_duration.......................................................: avg=3.26ms min=1.44ms med=2.61ms max=33.42ms p(90)=4.61ms p(95)=6.93ms\n      { expected_response:true }............................................: avg=3.26ms min=1.44ms med=2.61ms max=33.42ms p(90)=4.61ms p(95)=6.93ms\n    http_req_failed.........................................................: 0.00%  0 out of 1597\n    http_reqs...............................................................: 1597   531.215291/s\n\n    EXECUTION\n    dropped_iterations......................................................: 8      2.661066/s\n    iteration_duration......................................................: avg=3.37ms min=1.5ms  med=2.68ms max=33.52ms p(90)=4.78ms p(95)=7.77ms\n    iterations..............................................................: 1597   531.215291/s\n    vus.....................................................................: 2      min=0         max=4 \n    vus_max.................................................................: 17     min=10        max=17\n\n    NETWORK\n    data_received...........................................................: 590 kB 196 kB/s\n    data_sent...............................................................: 67 kB  22 kB/s\n\n\n\n"
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
        "http_req_blocked": {
          "avg": 0.03543514777708213,
          "min": 0.000221,
          "med": 0.000404,
          "max": 5.832962,
          "p(90)": 0.000466,
          "p(95)": 0.0005063999999999996
        },
        "http_req_connecting": {
          "p(90)": 0,
          "p(95)": 0,
          "avg": 0.008209989981214777,
          "min": 0,
          "med": 0,
          "max": 1.419866
        },
        "iterations": {
          "count": 1597,
          "rate": 531.2152907084909
        },
        "dropped_iterations": {
          "count": 8,
          "rate": 2.6610659522028346
        },
        "http_reqs": {
          "count": 1597,
          "rate": 531.2152907084909
        },
        "http_req_receiving": {
          "avg": 0.07689772824045094,
          "min": 0.012277,
          "med": 0.04091,
          "max": 0.922404,
          "p(90)": 0.2246104,
          "p(95)": 0.2628868
        },
        "vus_max": {
          "min": 10,
          "max": 17,
          "value": 17
        },
        "vus": {
          "max": 4,
          "value": 2,
          "min": 0
        },
        "http_req_tls_handshaking": {
          "p(90)": 0,
          "p(95)": 0,
          "avg": 0.02473998246712586,
          "min": 0,
          "med": 0,
          "max": 4.863871
        },
        "data_sent": {
          "count": 66587,
          "rate": 22149.04981991627
        },
        "http_req_waiting": {
          "min": 1.354689,
          "med": 2.481125,
          "max": 33.139798,
          "p(90)": 4.447791200000003,
          "p(95)": 6.833061199999974,
          "avg": 3.1373827658108935
        },
        "http_req_failed": {
          "passes": 0,
          "fails": 1597,
          "value": 0
        },
        "http_req_duration": {
          "max": 33.428795,
          "p(90)": 4.6179874000000005,
          "p(95)": 6.9324863999999495,
          "avg": 3.267538369442707,
          "min": 1.445151,
          "med": 2.617105
        },
        "data_received": {
          "count": 589572,
          "rate": 196111.2469465162
        },
        "iteration_duration": {
          "med": 2.68418,
          "max": 33.528687,
          "p(90)": 4.784595600000005,
          "p(95)": 7.774199399999973,
          "avg": 3.3723573581715787,
          "min": 1.50012
        },
        "http_req_sending": {
          "min": 0.022971,
          "med": 0.048738,
          "max": 0.458458,
          "p(90)": 0.07141020000000001,
          "p(95)": 0.09621439999999999,
          "avg": 0.053257875391358886
        },
        "http_req_duration{expected_response:true}": {
          "avg": 3.267538369442707,
          "min": 1.445151,
          "med": 2.617105,
          "max": 33.428795,
          "p(90)": 4.6179874000000005,
          "p(95)": 6.9324863999999495
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

