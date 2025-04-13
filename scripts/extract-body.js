// Usage: node extract-body.js input.json output.body.json
const fs = require('fs');

function main() {
  if (process.argv.length < 4) {
    console.error('Usage: node extract-body.js input.json output.body.json');
    process.exit(1);
  }
  const [input, output] = process.argv.slice(2);
  let raw = fs.readFileSync(input, 'utf8');
  let data = JSON.parse(raw);

  if (!data.body || typeof data.body !== 'string') {
    console.error('No string "body" field found in input.');
    process.exit(2);
  }

  let body;
  try {
    body = JSON.parse(data.body);
  } catch (e) {
    console.error('Failed to parse "body" field as JSON:', e);
    process.exit(3);
  }

  fs.writeFileSync(output, JSON.stringify(body, null, 2));
  console.log(`Extracted and de-stringified body written to ${output}`);
}

main();
