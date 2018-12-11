const wallabyBase = require('./wallaby.base');
module.exports = wallabyBase(
  ['scripts/**/*.{js,ts,tsx,json}'],
  ['scripts/**/*.spec.{ts,tsx,js,jsx}'],
);
