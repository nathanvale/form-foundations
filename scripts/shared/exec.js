'use strict';

const execFileSync = require('child_process').execFileSync;

const exec = (command, args, verbose) => {
  verbose && console.log('> ' + [command].concat(args).join(' ') + '\n');
  const options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8'
  };
  const result = execFileSync(command, args, options);

  return result;
};

exports.exec = exec;
