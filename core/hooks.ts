import { After, Before, setDefaultTimeout, type ITestCaseHookParameter } from "@cucumber/cucumber";
import * as fs from "fs";
import * as path from "path";
import { applyTestEnvironment, getBaseUrl } from "./env";
import { applyRegressionViewport } from "./regression-viewport";
import { CustomWorld } from "./world";

setDefaultTimeout(120_000);

const SCREENSHOTS_DIR = path.join(__dirname, "..", "screenshots");

Before(async function (this: CustomWorld) {
  applyTestEnvironment();
  applyRegressionViewport();
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  console.log(`Before - BASE_URL=${getBaseUrl()}`);
  await this.launchBrowser();
});

After(
  async function (
    this: CustomWorld,
    hookArg: ITestCaseHookParameter & { result?: { status: string } },
  ) {
    const failed = ["FAILED", "AMBIGUOUS", "UNDEFINED"].includes(hookArg.result?.status ?? "");
    if (failed && this.page) {
      const name = (hookArg.pickle?.name ?? "scenario")
        .replace(/[^\w.-]+/g, "_")
        .slice(0, 80);
      await this.page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${name}_${Date.now()}.png`),
        fullPage: true,
      });
    }
    await this.destroy();
  },
);
