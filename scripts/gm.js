'use strict';

const runPrecommit = require('./precommit/').runPrecommit;
const reportingUtils = require('./shared/reportingUtils');
const {
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = reportingUtils;

(async () => {
  try {
    const output = await runPrecommit();
    printInverseMessage('Precommit passed :)');
  } catch (e) {
    printInverseMessage('Precommit failed :(', MESSAGE_TYPE_FAIL);
    console.log(e);
    process.exit(1);
  }
})();
