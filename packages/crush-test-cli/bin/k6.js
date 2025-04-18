#!/usr/bin/env node

import("../dist/cli.js").then(mod => {
  mod.runCrushTestCli("k6", process.argv);
});
