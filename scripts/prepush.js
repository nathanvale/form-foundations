'use strict';
const chalk = require('chalk');
const { runPrepush } = require('./prepush/');
const {
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = require('./shared/reportingUtils');

(async () => {
  try {
    console.log('\r');
    printInverseMessage('Prepush Hook');
    console.log('\n');
    const output = await runPrepush();
    console.log('\n');
    printInverseMessage('Prepush hook passed :)', MESSAGE_TYPE_OK);
    console.log('\n');
  } catch (e) {
    console.log('\n');
    printInverseMessage('Prepush hook failed :(', MESSAGE_TYPE_FAIL);
    console.log('\r');
    console.log(e);
    console.log('\n');
    process.exit(1);
  }
})();
