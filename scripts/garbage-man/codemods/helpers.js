const jscodeshift = require('jscodeshift');

exports.removeSpecifier = specifier => {
  if (specifier.parentPath.value.length > 1) {
    jscodeshift(specifier).remove();
  } else {
    specifier.parent.prune();
  }
};

exports.removeNamedExport = (name, specifiers) => {
  specifiers
    .filter(path => path.value.local.name === name)
    .forEach(exports.removeSpecifier);
};

exports.removeNamedImport = (name, specifiers) => {
  specifiers
    .filter(path => path.value.local.name === name)
    .forEach(exports.removeSpecifier);
};
