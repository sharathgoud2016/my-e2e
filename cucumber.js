const path = require("path");
const fs = require("fs");

const reportsDir = path.join(__dirname, "reports");
fs.mkdirSync(reportsDir, { recursive: true });

if (!process.env.CUCUMBER_REPORT_STAMP) {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  process.env.CUCUMBER_REPORT_STAMP =
    `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}`;
}

const stamp = process.env.CUCUMBER_REPORT_STAMP;

module.exports = {
  default: {
    require: ["./step-definitions/**/*.ts", "./core/**/*.ts"],
    requireModule: ["ts-node/register"],
    paths: ["./features/**/*.feature"],
    format: [
      "progress",
      `json:"${path.join(reportsDir, `cucumberreport-${stamp}.json`)}"`,
    ],
    publishQuiet: true,
  },
};
