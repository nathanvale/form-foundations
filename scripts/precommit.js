'use strict';
const chalk = require('chalk');
const { runPrecommit } = require('./precommit/');
const {
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = require('./shared/reportingUtils');
const path = require('path');

(async () => {
  try {
    console.log('\r');
    printInverseMessage('Precommit Hook');
    console.log('\n');
    const output = await runPrecommit();
    console.log('\n');
    printInverseMessage('Precommit hook passed :)', MESSAGE_TYPE_OK);
    console.log('\n');
    if (output !== '') {
      console.log(output);
      console.log('\n');
    }
  } catch (e) {
    console.log('\n');
    printInverseMessage('Precommit hook failed :(', MESSAGE_TYPE_FAIL);
    console.log('\r');
    console.log(e.error);
    console.log('\n');

    process.exit(1);
  }
})();
