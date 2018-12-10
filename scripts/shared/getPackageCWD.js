const path = require('path');
const PACKAGES_DIR = require('./packagesDir').PACKAGES_DIR;
const getPackageName = require('./getPackageName').getPackageName;

function getPackageCWD(file) {
  const pkgName = getPackageName(file);
  return path.resolve(PACKAGES_DIR, pkgName);
}

exports.getPackageCWD = getPackageCWD;
