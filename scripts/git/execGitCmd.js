const { exec } = require('../shared/exec');

const execGitCmd = async args => {
  const a = exec('git', args);
  return a
    .trim()
    .toString()
    .split('\n');
};

exports.execGitCmd = execGitCmd;
