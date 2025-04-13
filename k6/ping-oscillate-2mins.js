import http from "k6/http";

export const options = {
  discardResponseBodies: true,
  scenarios: {
    dispatch: {
      executor: "ramping-arrival-rate",
      preAllocatedVUs: 10,
      maxVUs: 1000,
      startRate: 20,
      timeUnit: "1s",
      stages: [
        { target: 10, duration: "0s" },
        { target: 100, duration: "1s" },
        { target: 500, duration: "1s" },
        { target: 1000, duration: "10s" },
        { target: 2000, duration: "30s" },
        { target: 1000, duration: "30s" },
        { target: 2000, duration: "30s" },
        { target: 0, duration: "0" },
      ],
      exec: "dispatch",
    },
  },
};

// Hit an arbirtary URL with a GET request and discard the body
export function dispatch() {
  // Use TARGET_URL from environment, fallback to default
  const url = __ENV.TARGET_URL || "http://127.0.0.1:5001/ping";
  http.get(url);
}
