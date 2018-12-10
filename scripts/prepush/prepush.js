const { commitsOnBranch } = require("../git/commitsOnBranch");
const { listChangedFiles } = require("../shared/listChangedFiles");
const { execGitCmd } = require("../git/execGitCmd");
const chalk = require("chalk");
var semver = require("semver");
const {
  printToTerminalWidth,
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = require("../shared/reportingUtils");
const GIT_VERSION = "2.19.1";

async function execGitCmdFeedback(...args) {
  printToTerminalWidth("git " + args.join(" "));
  return await execGitCmd(args)
    .then(response => {
      printInverseMessage("DONE", MESSAGE_TYPE_OK);
      return response;
    })
    .catch(e => {
      printInverseMessage("FAIL", MESSAGE_TYPE_FAIL);
      throw new Error(e.stderr + "\r" + e.stdout);
    });
}

async function resetSoft(branchName) {
  await execGitCmdFeedback("reset", "--soft", "master");
}

async function stash() {
  console.log("\r\n");
  console.log(chalk.italic(`Attempting to stash your changes:`));
  console.log("\r");
  let result;
  let stashed = false;
  result = await execGitCmdFeedback(
    "stash",
    "push",
    "--include-untracked",
    "-m",
    "precommit-hook"
  );
  stashed = result[0] !== "No local changes to save";
  return stashed;
}

async function mergeMaster({ stashed, branchName }) {
  console.log("\r\n");
  console.log(
    chalk.italic(`Attempting to merge the master branch into ${branchName}:`)
  );
  console.log("\r");
  let result;
  const revertChanges = async e => {
    console.log("\r");
    console.log("Reverting changes:");
    console.log("\r");
    await execGitCmdFeedback("checkout", "--force", branchName);
    if (stashed) {
      await execGitCmdFeedback("stash", "apply");
    }
    throw e;
  };
  await execGitCmdFeedback("checkout", "master").catch(revertChanges);
  await execGitCmdFeedback("pull").catch(revertChanges);
  await execGitCmdFeedback("checkout", "--force", branchName);
  if (stashed) {
    await execGitCmdFeedback("stash", "apply");
  }
  await execGitCmdFeedback("merge", "master");
}

async function runPrepush() {
  printInverseMessage("Git");
  console.log("\r");
  console.log("\r");
  console.log(chalk.italic("Checking git version:"));
  console.log("\r");
  let result;
  result = await execGitCmdFeedback("--version");
  const version = result[0].match(/\d+\.\d+\.\d+/)[0];
  const oldVersion = semver.lt(version, GIT_VERSION);
  if (oldVersion) {
    throw new Error(
      `Your git version ${version} is not supported. Please upgrade git to at least ${GIT_VERSION}.`
    );
  }
  console.log("\r\n");
  console.log(chalk.italic("Getting your branch name:"));
  console.log("\r");
  const branchName = await execGitCmdFeedback(
    "rev-parse",
    "--abbrev-ref",
    "HEAD"
  );

  const stashed = await stash().catch(e => {
    throw new Error(
      e +
        "\r\n" +
        chalk.reset.inverse.bold.blue(" Tip ") +
        " Resolve this error and run `yarn cz --retry`.\n"
    );
  });

  await mergeMaster({ branchName, stashed }).catch(e => {
    throw new Error(
      e +
        "\r\n" +
        chalk.reset.inverse.bold.blue(" Tip ") +
        " Resolve this error and run yarn cz --retry`. \n"
    );
  });
  console.log("\r\n");
  console.log(chalk.italic("Checking if your commits need to be squash:"));
  console.log("\r");
  result = await execGitCmdFeedback(
    "rev-list",
    "--count",
    "--no-merges",
    "master.."
  );
  const commits = Number(result[0]);
  if (commits > 0) {
    result = await resetSoft(branchName);
  }

  const changedFiles = [...(await listChangedFiles())];

  console.log(changedFiles);

  return true;
}

exports.runPrepush = runPrepush;
