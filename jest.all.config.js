const base = require('./jest.config.js');

module.exports = {
  ...base,
  coverageThreshold: {
    global: {
      branches: 52.33,
      functions: 53.5,
      lines: 59.2,
      statements: 57.63,
    },
  },
};
