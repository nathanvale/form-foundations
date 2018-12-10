'use strict';
const chalk = require('chalk');
const runDocs = require('./docs/').runDocs;
const reportingUtils = require('./shared/reportingUtils');
const {
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = reportingUtils;
const mode = process.argv[2];
const verbose = mode === 'verbose';

(async () => {
  try {
    printInverseMessage('Building Docs');
    const output = await runDocs({ verbose });
    printInverseMessage('Docs passed :)', MESSAGE_TYPE_OK);
  } catch (e) {
    printInverseMessage('Docs failed :(', MESSAGE_TYPE_FAIL);
    console.log(e);
    process.exit(1);
  }
})();
