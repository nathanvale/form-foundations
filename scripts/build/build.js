const runBabel = require("../babel/").runBabel;
const getBuildPath = require("../shared/getBuildPath").getBuildPath;
const getPackagePaths = require("../shared/getPackagePaths").getPackagePaths;
const reportingUtils = require("../shared/reportingUtils");
const runClean = require("../clean/").runClean;
const runGarbageMan = require("../garbage-man/").runGarbageMan;
const runTSC = require("../tsc/").runTSC;
const {
  printToTerminalWidth,
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = reportingUtils;
const glob = require("glob");
const path = require("path");
const SRC_DIR = "src";
const BUILD_DIR = "dist";
const ES_BUILD_DIR = "es";
const CJS_BUILD_DIR = "cjs";

async function buildPackage(packagePath) {
  const srcDir = path.resolve(packagePath, SRC_DIR);
  const pattern = path.resolve(srcDir, "**/*");
  const files = glob.sync(pattern, {
    nodir: true
  });
  printToTerminalWidth(`${path.basename(packagePath)}`);
  let output = "";
  for (const file of files) {
    const esPath = getBuildPath(file, BUILD_DIR, ES_BUILD_DIR, SRC_DIR);
    const cjsPath = getBuildPath(file, BUILD_DIR, CJS_BUILD_DIR, SRC_DIR);
    output += await runBabel({ file, esPath, cjsPath });
  }
  return output;
}

async function runBuild({ verbose = false } = {}) {
  // BABEL
  // Transpiling
  await runClean();
  console.log("\r");
  printInverseMessage("Babel");
  console.log("\r");
  const packagePaths = getPackagePaths();
  let output = "";
  for (const packagePath of packagePaths) {
    output += await buildPackage(packagePath)
      .then(response => {
        printInverseMessage("DONE", MESSAGE_TYPE_OK);
        if (verbose) {
          process.stdout.write(`\n${response}\n`);
        }
      })
      .catch(e => {
        printInverseMessage("FAIL", MESSAGE_TYPE_FAIL);
        throw e;
      });
  }
  console.log("\r");
  // TYPESCRIPT
  // Remove any unresolved typescript after babel transpile
  // await runGarbageMan({ verbose });
  console.log("\r");
  // Generate typescript declaration files
  await runTSC({ verbose });
}

exports.runBuild = runBuild;
