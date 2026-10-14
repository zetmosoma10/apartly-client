import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "tests/setup.ts",
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/**/*d.ts",
        "src/entities",
        "src/store.ts",
        "src/assets",
        "src/index.css",
      ],
    },
  },
});
