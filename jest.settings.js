module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'babel-jest',
  },
  coverageReporters: ['json'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js}',
    '!dist/**',
    '!src/**/index.{ts,tsx,js}',
    '!babel.config.js',
    '!jest.config.js',
  ],
  coverageDirectory: '<rootDir>/coverage/',
  testMatch: ['<rootDir>/src/**/?(*.)spec.ts?(x)'],
  setupTestFrameworkScriptFile: '<rootDir>../../jest.setup.js',
  moduleFileExtensions: ['js', 'json', 'node', 'ts', 'tsx'],
  transformIgnorePatterns: ['/node_modules/(?!lodash-es)'],
  testURL: 'http://localhost',
  globals: {['__DEV__']: true},
  moduleNameMapper: {
    '^@form-foundations/([a-zA-Z0-9_-]+)$':
      process.cwd() + '/packages/$1/src/index.ts',
  },
}
