'use strict';
const chalk = require('chalk');
const runBootstrap = require('./bootstrap/').runBootstrap;
const reportingUtils = require('./shared/reportingUtils');
const { printLeaderBoard } = require('./shared/printLeaderBoard');
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
    printInverseMessage('Bootstrapping Monorepo');
    console.log('\n');
    if (verbose) {
      console.log('You are currently running in verbose mode.');
    } else {
      if (process.env.NODE_ENV !== 'ci') {
        printHint(
          'run `yarn bootstrap:verbose` to see more information about the bootstrapping.'
        );
      }
    }
    console.log('\n');
    const output = await runBootstrap({ verbose });
    console.log('\n');
    printInverseMessage('Bootstrapping passed :)', MESSAGE_TYPE_OK);
    console.log('\n');
    if (process.env.NODE_ENV !== 'ci') {
      await printLeaderBoard(verbose);
      console.log('\r');
      printHint(
        'run `yarn start` to fire up the docs with hot reloading. Happy hacking :)'
      );
      console.log('\r');
    }
  } catch (e) {
    console.log('\n');
    printInverseMessage('Bootstrapping failed :(', MESSAGE_TYPE_FAIL);
    console.log('\r');
    console.log(e);
    console.log('\n');
    process.exit(1);
  }
})();
