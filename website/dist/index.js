'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ff-website.cjs.production.js');
} else {
  module.exports = require('./ff-website.cjs.development.js');
}