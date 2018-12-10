const path = require("path");
module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|tsx|js)$": "babel-jest"
  },
  testRegex: "^.+\\.spec\\.(ts|tsx|js|jsx)$",
  setupTestFrameworkScriptFile: "<rootDir>../../jest.setup.js",
  moduleFileExtensions: ["js", "json", "jsx", "node", "ts", "tsx"],
  collectCoverage: true,
  coverageReporters: ["lcov", "text-summary"],
  transformIgnorePatterns: [
    "/node_modules/(?!@babel/runtime-corejs2|@babel/runtime*)"
  ],
  collectCoverageFrom: [
    "**/src/**/*.{ts,tsx,js,jsx}",
    "!**/package.json",
    "!**/src/**/*.spec.{ts,tsx,js,jsx}",
    "!**/src/**/*.story.{ts,tsx,js,jsx}",
    "!**/src/**/*.json",
    "!**/src/**/index.{ts,tsx,js,jsx}",
    "scripts/**/*.js",
    "!scripts/**/*.spec.js",
    "!scripts/*.js",
    "!scripts/**/index.js",
    "!docs/**/*.{ts,tsx,js,jsx}"
  ],
  testURL: "http://localhost",
  globals: { ["__DEV__"]: true }
};
