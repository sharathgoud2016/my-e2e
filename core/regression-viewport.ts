export type RegressionViewport = "desktop" | "mobile";

export const DESKTOP_VIEWPORT = { width: 1366, height: 900 };
export const MOBILE_VIEWPORT = { width: 390, height: 844 };

export function applyRegressionViewport(
  argv: string[] = process.argv.slice(2),
): RegressionViewport {
  for (const arg of argv) {
    const match = arg.match(/^(stage|prod):(desktop|mobile)$/i);
    if (match) {
      process.env.REGRESSION_VIEWPORT = match[2].toLowerCase();
      return match[2].toLowerCase() as RegressionViewport;
    }
  }

  const viewport = process.env.REGRESSION_VIEWPORT === "mobile" ? "mobile" : "desktop";
  process.env.REGRESSION_VIEWPORT = viewport;
  return viewport;
}

export function resolveViewportSize() {
  return applyRegressionViewport() === "mobile" ? MOBILE_VIEWPORT : DESKTOP_VIEWPORT;
}
