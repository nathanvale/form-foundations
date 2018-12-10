const base = require('../../jest.settings.js');
const pack = require('./package.json');

module.exports = {
  ...base,
  displayName: pack.name,
  name: pack.name,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
