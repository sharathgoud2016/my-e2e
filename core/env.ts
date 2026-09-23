import dotenv from "dotenv";

dotenv.config();

export type TestEnvironment = "stage" | "prod";

export const ENV_PROFILES: Record<TestEnvironment, string> = {
  stage: "https://example.com/",
  prod: "https://example.com/",
};

export function parseEnvArg(argv: string[]): TestEnvironment {
  for (const arg of argv) {
    const match = arg.match(/^(stage|prod):(desktop|mobile)$/i);
    if (match) return match[1].toLowerCase() as TestEnvironment;
  }

  if (argv.includes("prod")) return "prod";
  if (argv.includes("stage")) return "stage";
  return process.env.TEST_ENV === "prod" ? "prod" : "stage";
}

export function applyTestEnvironment(envName?: TestEnvironment): TestEnvironment {
  const resolved = envName ?? parseEnvArg(process.argv.slice(2));
  process.env.TEST_ENV = resolved;
  if (!process.env.BASE_URL?.trim()) process.env.BASE_URL = ENV_PROFILES[resolved];
  return resolved;
}

export function getBaseUrl(): string {
  applyTestEnvironment();
  return (process.env.BASE_URL ?? ENV_PROFILES.stage).replace(/\/?$/, "/");
}
