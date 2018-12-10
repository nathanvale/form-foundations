'use strict';
const chalk = require('chalk');
const { runPrettier } = require('./prettier/');
const { printHint } = require('./shared/printHint');
const {
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = require('./shared/reportingUtils');

const mode = process.argv[2] || 'check';
const shouldWrite = mode === '--write' || mode === '--write-changed';
const onlyChanged = mode === '--check-changed' || mode === '--write-changed';
const verbose = false;

(async () => {
  try {
    console.log('\r');
    printInverseMessage('Prettier');
    console.log('\n');
    if (!onlyChanged) {
      printHint(
        'pass in --onlyChanged to only prettify files that have changed since the current state of your main branch.'
      );
      console.log('\n');
    }
    const output = await runPrettier({ onlyChanged });
    console.log('\n');
    printInverseMessage('Prettier passed :)', MESSAGE_TYPE_OK);
    console.log('\n');
  } catch (e) {
    console.log('\n');
    printInverseMessage('Prettier failed :(', MESSAGE_TYPE_FAIL);
    console.log('\r');
    console.log(e);
    console.log('\n');
    process.exit(1);
  }
})();
