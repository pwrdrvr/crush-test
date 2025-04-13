// Usage: node update-readme-perf-table.js perf.md README.md
// Replaces the section between <!-- perf-table:start --> and <!-- perf-table:end --> in README.md with the contents of perf.md

const fs = require('fs');

function main() {
  const [,, perfMdPath, readmePath] = process.argv;
  if (!perfMdPath || !readmePath) {
    console.error('Usage: node update-readme-perf-table.js perf.md README.md');
    process.exit(1);
  }

  const startMarker = '<!-- perf-table:start -->';
  const endMarker = '<!-- perf-table:end -->';

  const perfTable = fs.readFileSync(perfMdPath, 'utf8').trim();
  let readme = fs.readFileSync(readmePath, 'utf8');

  const startIdx = readme.indexOf(startMarker);
  const endIdx = readme.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    console.error('Could not find perf-table markers in README.md');
    process.exit(2);
  }

  const before = readme.slice(0, startIdx + startMarker.length);
  const after = readme.slice(endIdx);

  const newReadme = `${before}\n\n${perfTable}\n\n${after}`;
  fs.writeFileSync(readmePath, newReadme);
  console.log('README.md updated with new performance table.');
}

main();
