const path = require('path');
const PACKAGES_DIR = require('./packagesDir').PACKAGES_DIR;

function getPackageName(file) {
  return path.relative(PACKAGES_DIR, file).split(path.sep)[0];
}

exports.getPackageName = getPackageName;
