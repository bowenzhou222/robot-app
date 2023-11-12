import type { Config } from "@jest/types";

// setupFiles: ["<rootDir>/tests/dotenv-config.js"],
// roots: ["<rootDir>/src"],
// testEnvironment: "node",
// testMatch: ["**/*.test.(ts|tsx)"],
// collectCoverageFrom: ["src/**/*.{ts,tsx}"],
// preset: "ts-jest",

const config: Config.InitialOptions = {
  verbose: true,
  setupFiles: ["<rootDir>/tests/dotenv-config.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
export default config;
