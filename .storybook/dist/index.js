'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ff-storybook.cjs.production.js');
} else {
  module.exports = require('./ff-storybook.cjs.development.js');
}