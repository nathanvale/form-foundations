// TODO: move to wallaby.config.js
const wallabyBase = require('./wallaby.base');
module.exports = wallabyBase(
  ['packages/*/src/**'],
  ['packages/*/src/**/*.spec.{ts,tsx}'],
);
