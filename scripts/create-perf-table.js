// Usage: node create-perf-table.js \
//   --oha-deploy samples/response-oha.body.json \
//   --k6-deploy samples/response-k6.body.json \
//   --oha-packaged samples/response-oha.body.json \
//   --k6-packaged samples/response-k6.body.json \
//   --output perf.md

const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const argMap = {};
  for (let i = 0; i < args.length; i += 2) {
    if (args[i].startsWith('--')) {
      argMap[args[i].slice(2)] = args[i + 1];
    }
  }
  return argMap;
}

function formatNumber(num, decimals = 0) {
  if (num === undefined || num === null || isNaN(num)) return '';
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function extractOhaMetrics(body) {
  // oha: summary fields are in stdout.value.summary
  // time fields (fastest, percentiles) are in seconds
  const summary = body.stdout?.value?.summary || {};
  const percentiles = body.stdout?.value?.latencyPercentiles || {};
  return {
    total: summary.total,
    rps: summary.requestsPerSec,
    min: summary.fastest,
    p50: percentiles.p50,
    p90: percentiles.p90,
    p95: percentiles.p95,
    raw: body,
  };
}

function extractK6Metrics(body) {
  // k6: metrics are in summaryExportField.value.metrics
  // time fields (min, med, p(90), p(95)) are in ms
  const metrics = body.summaryExportField?.value?.metrics || {};
  return {
    total: metrics.http_reqs?.count,
    rps: metrics.http_reqs?.rate,
    min: metrics.http_req_duration?.min,
    p50: metrics.http_req_duration?.med,
    p90: metrics.http_req_duration?.['p(90)'],
    p95: metrics.http_req_duration?.['p(95)'],
    raw: body,
  };
}

function processMetrics(metrics, type) {
  // type: 'oha' or 'k6'
  // For oha, time fields are in seconds, convert to ms
  // For k6, time fields are already in ms
  const isOha = type === 'oha';
  const timeFactor = isOha ? 1000 : 1;
  return {
    total: formatNumber(metrics.total, 0),
    rps: formatNumber(metrics.rps, 1),
    min: formatNumber(metrics.min * timeFactor, 2),
    p50: formatNumber(metrics.p50 * timeFactor, 2),
    p90: formatNumber(metrics.p90 * timeFactor, 2),
    p95: formatNumber(metrics.p95 * timeFactor, 2),
    raw: metrics.raw,
  };
}

function addDetailsBlock(label, obj) {
  return [
    '',
    `<details><summary>${label} Raw JSON</summary>`,
    '',
    '```json',
    JSON.stringify(obj, null, 2),
    '```',
    '</details>',
    ''
  ].join('\n');
}

function main() {
  const args = parseArgs();
  const ohaDeploy = args['oha-deploy'];
  const k6Deploy = args['k6-deploy'];
  const ohaPackaged = args['oha-packaged'];
  const k6Packaged = args['k6-packaged'];
  const output = args['output'] || 'perf.md';
  const shortOutput = 'perf-short.md';

  if (!ohaDeploy || !k6Deploy || !ohaPackaged || !k6Packaged) {
    console.error('Missing required arguments.');
    process.exit(1);
  }

  // Read and extract metrics
  const ohaDeployMetrics = processMetrics(
    extractOhaMetrics(JSON.parse(fs.readFileSync(ohaDeploy, 'utf8'))),
    'oha'
  );
  const k6DeployMetrics = processMetrics(
    extractK6Metrics(JSON.parse(fs.readFileSync(k6Deploy, 'utf8'))),
    'k6'
  );
  const ohaPackagedMetrics = processMetrics(
    extractOhaMetrics(JSON.parse(fs.readFileSync(ohaPackaged, 'utf8'))),
    'oha'
  );
  const k6PackagedMetrics = processMetrics(
    extractK6Metrics(JSON.parse(fs.readFileSync(k6Packaged, 'utf8'))),
    'k6'
  );

  // Build Markdown table (shared)
  const tableLines = [];
  tableLines.push('### 🚀 Performance Test Results\n');
  tableLines.push('| Metric | Deploy Oha | Deploy K6 | Deploy Packaged Oha | Deploy Packaged K6 |');
  tableLines.push('|--------|-----------:|----------:|--------------------:|-------------------:|');
  tableLines.push(`| Total Requests | ${ohaDeployMetrics.total} | ${k6DeployMetrics.total} | ${ohaPackagedMetrics.total} | ${k6PackagedMetrics.total} |`);
  tableLines.push(`| Overall RPS | ${ohaDeployMetrics.rps} | ${k6DeployMetrics.rps} | ${ohaPackagedMetrics.rps} | ${k6PackagedMetrics.rps} |`);
  tableLines.push(`| Min Response Time (ms) | ${ohaDeployMetrics.min} | ${k6DeployMetrics.min} | ${ohaPackagedMetrics.min} | ${k6PackagedMetrics.min} |`);
  tableLines.push(`| p50 Response Time (ms) | ${ohaDeployMetrics.p50} | ${k6DeployMetrics.p50} | ${ohaPackagedMetrics.p50} | ${k6PackagedMetrics.p50} |`);
  tableLines.push(`| p90 Response Time (ms) | ${ohaDeployMetrics.p90} | ${k6DeployMetrics.p90} | ${ohaPackagedMetrics.p90} | ${k6PackagedMetrics.p90} |`);
  tableLines.push(`| p95 Response Time (ms) | ${ohaDeployMetrics.p95} | ${k6DeployMetrics.p95} | ${ohaPackagedMetrics.p95} | ${k6PackagedMetrics.p95} |`);

  // Full version with details blocks
  let md = [...tableLines];
  md.push(addDetailsBlock('Deploy Oha', ohaDeployMetrics.raw));
  md.push(addDetailsBlock('Deploy K6', k6DeployMetrics.raw));
  md.push(addDetailsBlock('Deploy Packaged Oha', ohaPackagedMetrics.raw));
  md.push(addDetailsBlock('Deploy Packaged K6', k6PackagedMetrics.raw));
  fs.writeFileSync(output, md.join('\n'));
  console.log(`Performance summary written to ${output}`);

  // Short version (no details blocks)
  let mdShort = [...tableLines];
  fs.writeFileSync(shortOutput, mdShort.join('\n'));
  console.log(`Short performance summary written to ${shortOutput}`);
}

main();
