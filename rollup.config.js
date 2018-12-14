import fs from 'fs';
import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import sourceMaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify-es';
import { minify } from 'uglify-es';
import mkdirp from 'mkdirp';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const inputFile = path.join(__dirname, 'src/index.js');

function ensureDirectoryExistence(dirname) {
  console.log('dirname', dirname);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname);
}

async function config() {
  try {
    const { stdout } = await exec(`lerna ls --json`);
    const packages = JSON.parse(stdout);
    const template = ({ name }) => `'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./${name.match(/[ \w-]+$/g)}.cjs.production.js');
} else {
  module.exports = require('./${name.match(/[ \w-]+$/g)}.cjs.development.js');
}`;

    packages.forEach(({ name, location }) => {
      ensureDirectoryExistence(`${location}/dist/`);
      fs.writeFileSync(`${location}/dist/index.js`, template({ name }));
    });

    const input = './compiled/index.js';
    const external = id => !id.startsWith('.') && !id.startsWith('/');
    const replacements = [{ original: 'lodash', replacement: 'lodash-es' }];
    const babelOptions = {
      exclude: /node_modules/,
      runtimeHelpers: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [
        'annotate-pure-calls',
        'dev-expression',
        ['transform-rename-import', { replacements }],
      ],
    };

    const buildUmd = ({ env, location, name }) => ({
      input: `${location}/src/index.ts`,
      external: ['react', 'react-native', 'styled-components'],
      output: {
        name: name,
        format: 'umd',
        sourcemap: true,
        file:
          env === 'production'
            ? `${location}/dist/${name.match(/[ \w-]+$/g)}.umd.${env}.js`
            : `${location}/dist/${name.match(/[ \w-]+$/g)}.umd.${env}.js`,
        exports: 'named',
        globals: {
          react: 'React',
          'react-native': 'ReactNative',
          'styled-components': 'styled',
        },
      },

      plugins: [
        resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify(env),
        }),
        babel(babelOptions),
        commonjs({
          include: /node_modules/,
          namedExports: {
            'node_modules/prop-types/index.js': [
              'object',
              'oneOfType',
              'string',
              'node',
              'func',
              'bool',
              'element',
            ],
          },
        }),
        sourceMaps(),
        sizeSnapshot(),
        env === 'production' &&
          uglify(
            {
              output: { comments: false },
              compress: {
                keep_infinity: true,
                pure_getters: true,
              },
              warnings: true,
              toplevel: false,
            },
            minify,
          ),
      ],
    });

    const buildCjs = ({ env, location, name }) => ({
      input: `${location}/src/index.ts`,
      external,
      output: {
        file: `${location}/dist/${name.match(/[ \w-]+$/g)}.cjs.${env}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      plugins: [
        resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify(env),
        }),
        babel(babelOptions),
        sourceMaps(),
        sizeSnapshot(),
      ],
    });

    const buildES = ({ location, name }) => ({
      input: `${location}/src/index.ts`,
      external,
      output: [
        {
          file: `${location}/dist/${name.match(/[ \w-]+$/g)}.esm.js`,
          format: 'es',
          sourcemap: true,
        },
      ],
      plugins: [
        resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        ,
        babel(babelOptions),
        sizeSnapshot(),
        sourceMaps(),
      ],
    });
    return []
      .concat(
        packages.map(({ location, name }) =>
          buildUmd({ env: 'production', location, name }),
        ),
      )
      .concat(
        packages.map(({ location, name }) =>
          buildUmd({ env: 'development', location, name }),
        ),
      )
      .concat(
        packages.map(({ location, name }) =>
          buildCjs({ env: 'production', location, name }),
        ),
      )
      .concat(
        packages.map(({ location, name }) =>
          buildCjs({ env: 'development', location, name }),
        ),
      )
      .concat(
        packages.map(({ location, name }) => buildES({ location, name })),
      );
    /*return [
      buildUmd({ env: 'production' }),
        buildUmd({ env: 'development' }),
           buildCjs({ env: 'production' }),
      buildCjs({ env: 'development' }),
      buildES(), 
    ];*/
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

export default config;
