const { execGitCmd } = require("./execGitCmd");
async function getLeaderBoard({ days = 60 } = {}) {
  const args = [
    "shortlog",
    "-s",
    "-n",
    "-e",
    "--all",
    "--since",
    `${days}.days`,
    "--no-merges",
    "master"
  ];
  let authors = await execGitCmd(args);
  return authors;
}
exports.getLeaderBoard = getLeaderBoard;
