const { defaults } = require('jest-config');
const base = require('./jest.settings.js');

module.exports = {
  ...base,
  setupTestFrameworkScriptFile: './jest.setup.js',
  projects: ['<rootDir>', '<rootDir>/packages/*/jest.config.js'],
  coverageReporters: ['lcov', 'text-summary'],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js}',
    '!dist/**',
    '!src/**/index.{ts,tsx,js}',
    '!babel.config.js',
    '!jest.config.js',
  ],
  coverageThreshold: {
    global: {
      branches: 48.84,
      functions: 37.3,
      lines: 49.42,
      statements: 45.83,
    },
  },
};
