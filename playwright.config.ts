import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 4,
  use: {
    ...devices['Desktop Edge'],
    channel: 'msedge',
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: false,
        storageState: existsSync('auth.json') ? 'auth.json' : undefined,
      },
    },
    {
      name: 'msedge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        headless: false,
        storageState: existsSync('auth.json') ? 'auth.json' : undefined,
      },
    },
  ],
});