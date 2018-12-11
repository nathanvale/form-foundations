const wallabyBase = require('./wallaby.base');
module.exports = wallabyBase(
  ['packages/core/**'],
  ['packages/core/**/*.spec.{ts,tsx}'],
);
