'use strict';
const chalk = require('chalk');
const { runTSLint } = require('./tslint/');
const { printHint } = require('./shared/printHint');
const {
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = require('./shared/reportingUtils');

const mode = process.argv[2];
const onlyChanged = mode === '--onlyChanged';

(async () => {
  try {
    console.log('\r');
    printInverseMessage('TSlint');
    console.log('\n');
    if (!onlyChanged) {
      if (process.env.NODE_ENV !== 'ci') {
        printHint(
          'pass in --onlyChanged to only lint files that have changed since the current state of your main branch.'
        );
      }
      console.log('\n');
    }
    const output = await runTSLint({ onlyChanged });
    console.log('\n');
    printInverseMessage('TSlint passed :)', MESSAGE_TYPE_OK);
    console.log('\n');
  } catch (e) {
    console.log('\n');
    printInverseMessage('TSlint failed :(', MESSAGE_TYPE_FAIL);
    console.log('\r');
    console.log(e);
    console.log('\n');
    process.exit(1);
  }
})();
