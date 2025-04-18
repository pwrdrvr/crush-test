#!/usr/bin/env node

import("../dist/cli.js").then(mod => {
  mod.runCrushTestCli("oha", process.argv);
});
