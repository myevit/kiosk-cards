import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  timeout: 15000,
  use: {
    baseURL: "http://127.0.0.1:8897",
    headless: true,
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH,
      args: ["--no-sandbox"],
    },
  },
  webServer: {
    command: "python3 -m http.server 8897 --bind 127.0.0.1",
    port: 8897,
    reuseExistingServer: !process.env.CI,
  },
});
