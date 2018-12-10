'use strict';

const runClean = require('./clean/').runClean;
const reportingUtils = require('./shared/reportingUtils');
const {
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = reportingUtils;

(async () => {
  try {
    const output = await runClean();
    printInverseMessage('Clean passed :)', MESSAGE_TYPE_OK);
  } catch (e) {
    printInverseMessage('Clean failed :(', MESSAGE_TYPE_FAIL);
    console.log(e);
    process.exit(1);
  }
})();
