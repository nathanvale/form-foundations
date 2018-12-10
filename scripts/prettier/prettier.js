'use strict';

const chalk = require('chalk');
const glob = require('glob');
const prettier = require('prettier');
const fs = require('fs');
const { listChangedFiles } = require('../shared/listChangedFiles');
const prettierConfigPath = require.resolve('../../.prettierrc');
const {
  printToTerminalWidth,
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = require('../shared/reportingUtils');

async function runPrettier({
  shouldWrite = true,
  onlyChanged = false,
  verbose = false
} = {}) {
  printToTerminalWidth(
    `enforcing a consistent style to ${
      onlyChanged ? 'your committed' : 'all'
    } files`
  );

  let didWarn = false;
  let didError = false;
  let output = '';

  const changedFiles = onlyChanged ? await listChangedFiles() : null;

  const files = glob
    .sync('**/*.{js,jsx,ts,tsx,json}', {
      ignore: [
        '**/node_modules/**',
        '**/dist/**',
        '**/package.json',
        '**/coverage/**'
      ]
    })
    .filter(f => !onlyChanged || changedFiles.has(f));

  if (!files.length) {
    return '';
  }

  const parserMap = {
    js: 'babylon',
    jsx: 'babylon',
    ts: 'typescript',
    tsx: 'typescript',
    json: 'json'
  };

  files.forEach(file => {
    let options = prettier.resolveConfig.sync(file, {
      config: prettierConfigPath
    });
    const ext = file.split('.').pop();
    options = {
      ...options,
      parser: parserMap[ext]
    };
    output += chalk.green('\u2022 ') + file + '\n';
    try {
      const input = fs.readFileSync(file, 'utf8');
      if (shouldWrite) {
        if (!options.parser) {
          console.log(file);
        }
        const parsed = prettier.format(input, options);
        if (parsed !== input) {
          fs.writeFileSync(file, parsed, 'utf8');
        }
      } else {
        if (!prettier.check(input, options)) {
          if (!didWarn) {
            console.log(
              '\n' +
                chalk.red(
                  '  This project uses prettier to format all JavaScript code.\n'
                ) +
                chalk.dim('    Please run ') +
                chalk.reset('yarn prettier-all') +
                chalk.dim(
                  ' and add changes to files listed below to your commit:'
                ) +
                '\n\n'
            );
            didWarn = true;
          }
          console.log(file);
        }
      }
    } catch (e) {
      printInverseMessage('FAIL', MESSAGE_TYPE_FAIL);
      throw new Error(file + '\n\n' + e);
    }
  });

  if (didWarn) {
    process.exit(1);
  }

  printInverseMessage('DONE', MESSAGE_TYPE_OK);

  if (verbose) {
    console.log('\r');
    console.log(output);
  }
  return '';
}

exports.runPrettier = runPrettier;
