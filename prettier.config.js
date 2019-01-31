/* TODO: wait for this issue to be resolved
https://github.com/prettier/prettier-vscode/issues/601
const { prettier: prettierConfig } = require('ndv-scripts/config');
module.exports = Object.assign(prettierConfig, {});
 */
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: false,
  jsxBracketSameLine: false,
}
