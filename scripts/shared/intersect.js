const minimatch = require('minimatch');
const arrayUnion = require('array-union');
const arrayDiffer = require('array-differ');
const arrify = require('arrify');

function intersect(files, patterns, options) {
  files = arrify(files);
  patterns = arrify(patterns);

  if (files.length === 0 || patterns.length === 0) {
    return [];
  }

  options = options || {};

  return patterns.reduce((ret, pattern) => {
    let process = arrayUnion;

    if (pattern[0] === '!') {
      pattern = pattern.slice(1);
      process = arrayDiffer;
    }

    return process(
      ret,
      minimatch.match(files, pattern, { matchBase: true, dot: true })
    );
  }, []);
}

exports.intersect = intersect;
