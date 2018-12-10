'use strict';
const chalk = require('chalk');
const runBuild = require('./build/').runBuild;
const reportingUtils = require('./shared/reportingUtils');
const { printHint } = require('./shared/printHint');
const {
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = reportingUtils;
const mode = process.argv[2];
const verbose = mode === 'verbose';

(async () => {
  try {
    console.log('\r');
    printInverseMessage('Building Monorepo');
    console.log('\n');
    if (verbose) {
      process.stdout.write('You are currently running in verbose mode.\n\n\n');
    } else {
      if (process.env.NODE_ENV !== 'ci') {
        printHint(
          'run `yarn build:verbose` to see more information about the build'
        );
      }
    }
    console.log('\n');
    const output = await runBuild({ verbose });
    console.log('\n');
    printInverseMessage('Build passed :)', MESSAGE_TYPE_OK);
    console.log('\n');
  } catch (e) {
    console.log('\n');
    printInverseMessage('Build failed :(', MESSAGE_TYPE_FAIL);
    console.log('\r');
    console.log(e);
    console.log('\n');
    process.exit(1);
  }
})();
