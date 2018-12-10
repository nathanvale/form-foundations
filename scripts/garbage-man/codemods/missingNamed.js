const helpers = require('./helpers');
const { removeNamedExport, removeNamedImport } = helpers;

function missingNamed(file, api, options = {}) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions || { quote: 'single' };
  const name = options.value;

  const exportSpecifiers = root
    .find(j.ExportNamedDeclaration)
    .find(j.ExportSpecifier);
  removeNamedExport(name, exportSpecifiers);

  const importSpecifiers = root
    .find(j.ImportDeclaration)
    .find(j.ImportSpecifier);
  removeNamedImport(name, importSpecifiers);

  return root.toSource(options.printOptions || { quote: 'single' });
}

exports.missingNamed = missingNamed;
