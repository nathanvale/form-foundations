const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.resolve(__dirname, '../../packages');

// Get absolute paths of all directories under packages/*
function getPackagePaths() {
  return fs
    .readdirSync(PACKAGES_DIR)
    .map(file => path.resolve(PACKAGES_DIR, file))
    .filter(f => fs.lstatSync(path.resolve(f)).isDirectory());
}

exports.getPackagePaths = getPackagePaths;
