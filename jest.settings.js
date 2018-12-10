module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'babel-jest',
  },
  testMatch: ['<rootDir>/test/**/?(*.)(spec|test).ts?(x)'],
  setupTestFrameworkScriptFile: '<rootDir>../../jest.setup.js',
  moduleFileExtensions: ['js', 'json', 'node', 'ts', 'tsx'],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text-summary'],
  transformIgnorePatterns: ['/node_modules/(?!@babel/runtime-corejs2)'],
  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx}',
    '!**/package.json',
    '!**/src/**/*.spec.{ts,tsx}',
    '!**/src/**/*.story.{ts,tsx}',
    '!**/src/**/*.json',
    '!**/src/**/index.{ts,tsx}',
  ],
  testURL: 'http://localhost',
  globals: { ['__DEV__']: true },
};
