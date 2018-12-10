const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
async function execLernaCmd(args) {
  const options = { maxBuffer: 500 * 1024 };
  return exec(`lerna ${args.join(' ')}`, options).then(({ stderr }) => {
    return stderr;
  });
}

exports.execLernaCmd = execLernaCmd;
