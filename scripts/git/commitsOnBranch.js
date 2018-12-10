const { execGitCmd } = require("./execGitCmd");
function commitsOnBranch() {
  const output = execGitCmd([
    "rev-list",
    "--count",
    "--no-merges",
    "origin/master"
  ]);
  return output;
}
exports.commitsOnBranch = commitsOnBranch;
