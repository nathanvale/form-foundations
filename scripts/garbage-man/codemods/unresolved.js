const helpers = require('./helpers');
const { removeNamedExport, removeSpecifier } = helpers;

/**
 * Looks for unresolved export all declarations such as export * from
 * './Accordion.types'; then delete em!
 *
 * And also looks for unresolved named imports { CardGrid } from './CardGrid';
 * thens delete any matching reexports!
 */

function unresolved(file, api, options = {}) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions || { quote: 'single' };
  // the unresolved module - eg "'./Accordion.types'"
  const literal = options.value;
  const removeReExports = importSpecifier => {
    const namedExportToRemove = importSpecifier.value.local.name;
    const exportSpecifiers = root
      .find(j.ExportNamedDeclaration)
      .find(j.ExportSpecifier);
    removeNamedExport(namedExportToRemove, exportSpecifiers);
    removeSpecifier(importSpecifier);
  };
  root
    .find(j.ExportAllDeclaration, {
      source: {
        type: 'Literal',
        raw: literal
      }
    })
    .forEach(path => path.prune());
  root
    .find(j.ImportDeclaration, {
      source: {
        type: 'Literal',
        raw: literal
      }
    })
    .find(j.ImportSpecifier)
    .forEach(removeReExports);
  return root.toSource(options.printOptions || { quote: 'single' });
}

exports.unresolved = unresolved;
