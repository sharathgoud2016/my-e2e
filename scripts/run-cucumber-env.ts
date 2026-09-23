import { spawnSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { applyTestEnvironment, type TestEnvironment } from "../core/env";
import { applyRegressionViewport } from "../core/regression-viewport";

const ROOT = path.join(__dirname, "..");

function isFeature(arg: string): boolean {
  return arg.endsWith(".feature") || arg.includes("features/");
}

function isEnv(arg: string): boolean {
  return arg === "stage" || arg === "prod" || /^(stage|prod):(desktop|mobile)$/i.test(arg);
}

function parseTag(argv: string[]): string {
  const tags = argv.filter(
    (arg) => !isEnv(arg) && !isFeature(arg) && (arg.startsWith("@") || arg.includes("@")),
  );
  return tags[0] ?? "@site-smoke";
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const envName: TestEnvironment = applyTestEnvironment();
  applyRegressionViewport(argv);
  fs.mkdirSync(path.join(ROOT, "reports"), { recursive: true });

  const bin = path.join(
    ROOT,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "cucumber-js.cmd" : "cucumber-js",
  );
  const features = argv.filter((arg) => isFeature(arg) && !isEnv(arg));
  const result = spawnSync(bin, ["--tags", parseTag(argv), ...features], {
    cwd: ROOT,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  });

  console.log(`TEST_ENV=${envName}`);
  process.exit(result.status ?? 1);
}
