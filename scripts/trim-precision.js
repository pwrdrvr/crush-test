// Usage: node trim-precision.js input.json output.json
const fs = require('fs');

function isRateKey(key) {
  return /rate|rps|requestspersec|successrate/i.test(key);
}
function isTimeKey(key) {
  return /time|duration|latency|fastest|slowest|average|avg|min|max|med|p\d{2,3}|p\(\d{2,3}\)/i.test(key);
}
function roundValue(key, value) {
  if (typeof value !== 'number') return value;
  if (isRateKey(key)) return Number(value.toFixed(1));
  if (isTimeKey(key)) return Number(value.toFixed(2));
  return value;
}
function processObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map(processObject);
  } else if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'object' && v !== null) {
        out[k] = processObject(v);
      } else {
        out[k] = roundValue(k, v);
      }
    }
    return out;
  }
  return obj;
}

// Handles double-encoded JSON in "body" fields
function tryParseBody(obj) {
  if (obj && typeof obj === 'object' && obj.body && typeof obj.body === 'string') {
    try {
      const parsed = JSON.parse(obj.body);
      obj.body = parsed;
      return obj;
    } catch {}
  }
  return obj;
}

function main() {
  if (process.argv.length < 4) {
    console.error('Usage: node trim-precision.js input.json output.json');
    process.exit(1);
  }
  const [input, output] = process.argv.slice(2);
  let raw = fs.readFileSync(input, 'utf8');
  let data = JSON.parse(raw);

  // Try to parse double-encoded body if present
  data = tryParseBody(data);
  if (data.body && typeof data.body === 'object' && data.body.stdout && typeof data.body.stdout.value === 'string') {
    // OHA: stdout.value is a JSON string
    try {
      data.body.stdout.value = JSON.parse(data.body.stdout.value);
    } catch {}
  }
  if (data.body && typeof data.body === 'object' && data.body.summaryExportField && typeof data.body.summaryExportField.value === 'string') {
    // k6: summaryExportField.value is a JSON string
    try {
      data.body.summaryExportField.value = JSON.parse(data.body.summaryExportField.value);
    } catch {}
  }

  // Recursively process all objects
  const processed = processObject(data);

  // Re-encode any fields that were originally strings
  if (processed.body && typeof processed.body === 'object' && processed.body.stdout && typeof processed.body.stdout.value === 'object') {
    processed.body.stdout.value = JSON.stringify(processed.body.stdout.value);
  }
  if (processed.body && typeof processed.body === 'object' && processed.body.summaryExportField && typeof processed.body.summaryExportField.value === 'object') {
    processed.body.summaryExportField.value = JSON.stringify(processed.body.summaryExportField.value);
  }
  if (processed.body && typeof processed.body === 'object') {
    processed.body = JSON.stringify(processed.body);
  }

  fs.writeFileSync(output, JSON.stringify(processed, null, 2));
  console.log(`Trimmed precision written to ${output}`);
}

main();
