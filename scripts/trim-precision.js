/*
 * Usage:
 *   node trim-precision.js input.json output.json [--ms]
 *   --ms: multiply all time values by 1000 before rounding (for OHA seconds to ms)
 */
const fs = require('fs');

function isRateKey(key) {
  return /rate|rps|requestspersec|successrate/i.test(key);
}
function isTimeKey(key) {
  return /time|duration|latency|fastest|slowest|average|avg|min|max|med|p\d{2,3}|p\(\d{2,3}\)/i.test(key);
}
function roundValue(key, value, multiplyMs) {
  if (typeof value !== 'number') return value;
  if (isRateKey(key)) return Number(value.toFixed(1));
  if (isTimeKey(key)) {
    if (multiplyMs) value = value * 1000;
    return Number(value.toFixed(2));
  }
  return value;
}
function processObject(obj, multiplyMs) {
  if (Array.isArray(obj)) {
    return obj.map((v) => processObject(v, multiplyMs));
  } else if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'object' && v !== null) {
        out[k] = processObject(v, multiplyMs);
      } else {
        out[k] = roundValue(k, v, multiplyMs);
      }
    }
    return out;
  }
  return obj;
}

function main() {
  if (process.argv.length < 4) {
    console.error('Usage: node trim-precision.js input.json output.json [--ms]');
    process.exit(1);
  }
  const args = process.argv.slice(2);
  const input = args[0];
  const output = args[1];
  const multiplyMs = args.includes('--ms');

  let raw = fs.readFileSync(input, 'utf8');
  let data = JSON.parse(raw);

  // Recursively process all objects
  const processed = processObject(data, multiplyMs);

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
