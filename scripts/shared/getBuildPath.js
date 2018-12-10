const path = require('path');
const PACKAGES_DIR = require('./packagesDir').PACKAGES_DIR;
const getPackageName = require('./getPackageName').getPackageName;

function getBuildPath(file, buildFolder, buildFolderType, srcDir) {
  const pkgName = getPackageName(file);
  const pkgSrcPath = path.resolve(PACKAGES_DIR, pkgName, srcDir);
  const pkgBuildPath = path.resolve(
    PACKAGES_DIR,
    pkgName,
    buildFolder,
    buildFolderType
  );
  const relativeToSrcPath = path.relative(pkgSrcPath, file);
  return path.resolve(pkgBuildPath, relativeToSrcPath);
}
exports.getBuildPath = getBuildPath;
