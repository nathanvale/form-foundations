'use strict';
const { execGitCmd } = require('../git/execGitCmd');
const { exec } = require('./exec');

const execFileSync = require('child_process').execFileSync;

const listChangedFiles = async () => {
  // Given two commits A and B, git merge-base A B will output a
  // commit which is reachable from both A and B through the parent
  // relationship.
  const mergeBase = await execGitCmd(['merge-base', 'HEAD', 'main']);
  // View the changes you have in your working tree relative to the
  // named <commit> (mergeBase). Make sure to only select files
  // that are added, copied, modified, renamed, changed, unmerged or
  // have had thier pairing broken.
  // https://git-scm.com/docs/git-diff#git-diff-emgitdiffemltoptionsgtltcommitgt--ltpathgt82308203
  // https://git-scm.com/docs/git-diff#git-diff---name-only
  // https://git-scm.com/docs/git-diff#git-diff---diff-filterACDMRTUXB82308203
  const diff = await execGitCmd([
    'diff',
    '--name-only',
    '--diff-filter=ACMRTUB',
    mergeBase
  ]);
  // Also get untracked files
  // https://git-scm.com/docs/git-ls-files#git-ls-files---others
  // and add the standard Git exclusions:
  // .git/info/exclude, .gitignore in each //directory,
  // and the user’s global exclusion file.
  // https://git-scm.com/docs/git-ls-files#git-ls-files---exclude-standard
  const lsFiles = await execGitCmd([
    'ls-files',
    '--others',
    '--exclude-standard'
  ]);
  return new Set([...diff, ...lsFiles]);
};

exports.listChangedFiles = listChangedFiles;
