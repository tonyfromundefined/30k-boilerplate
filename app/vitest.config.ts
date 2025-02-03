import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["dotenv-safe/config.js"],
  },
});
