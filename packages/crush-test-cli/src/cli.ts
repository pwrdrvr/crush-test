import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import fs from "fs";
import path from "path";

export async function runCrushTestCli(tool: "k6" | "oha", argv: string[]) {
  const lambda = process.env.CRUSH_TEST_LAMBDA;
  if (!lambda) {
    console.error("Error: CRUSH_TEST_LAMBDA environment variable is not set.");
    process.exit(1);
  }

  // Remove the first two argv entries (node, script)
  const args = argv.slice(2);

  let testProfileBase64: string | undefined = undefined;
  let filteredArgs = [...args];

  if (tool === "k6") {
    // Find the first .js file in args (test profile)
    const jsFileIdx = args.findIndex((a) => a.endsWith(".js"));
    if (jsFileIdx !== -1) {
      const jsFilePath = args[jsFileIdx];
      try {
        const absPath = path.resolve(process.cwd(), jsFilePath);
        const fileContent = fs.readFileSync(absPath);
        testProfileBase64 = fileContent.toString("base64");
        filteredArgs.splice(jsFileIdx, 1); // Remove the file path from args
      } catch (e) {
        console.error("Failed to read test profile file:", jsFilePath, e);
        process.exit(1);
      }
    }
  }

  // Collect env vars to send
  const envVars: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (
      key.startsWith("TOKIO_") ||
      key.startsWith("K6_") ||
      key.startsWith("OHA_") ||
      key === "TARGET_URL"
    ) {
      envVars[key] = value as string;
    }
  }

  // Prepare payload
  const payload: any = {
    tool,
    args: filteredArgs,
    ...(Object.keys(envVars).length > 0 ? { env: envVars } : {})
  };
  if (testProfileBase64) {
    payload.testProfile = { base64Content: testProfileBase64 };
  }

  // Prepare Lambda client and params
  const client = new LambdaClient({});
  const command = new InvokeCommand({
    FunctionName: lambda,
    Payload: Buffer.from(JSON.stringify(payload)),
  });

  try {
    const response = await client.send(command);
    if (!response.Payload) {
      throw new Error("No payload returned from Lambda");
    }
    const body = JSON.parse(Buffer.from(response.Payload).toString("utf-8"));
    const result = JSON.parse(body.body);

    if (result.stdout) {
      if (result.stdout.type === "json") {
        console.log(JSON.stringify(result.stdout.value, null, 2));
      } else {
        process.stdout.write(result.stdout.value);
      }
    }
    if (tool === "k6" && result.summaryExportField) {
      console.log("\n--- k6 summary export ---");
      console.log(JSON.stringify(result.summaryExportField.value, null, 2));
    }
    if (result.stderr) {
      process.stderr.write(result.stderr);
    }
    process.exit(result.exitCode);
  } catch (err) {
    console.error("Error invoking Lambda:", err);
    process.exit(1);
  }
}
