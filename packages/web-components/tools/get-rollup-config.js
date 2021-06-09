/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const chalk = require('chalk');
const Table = require('cli-table');
const gzip = require('gzip-size');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rtlcss = require('rtlcss');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const { terser } = require('rollup-plugin-terser');
const sizes = require('rollup-plugin-sizes');
const multiInput = require('rollup-plugin-multi-input').default;

const packageJson = require('../package.json');
const ibmdotcomIcon = require('./rollup-plugin-ibmdotcom-icon');
const litSCSS = require('./rollup-plugin-lit-scss');
const fixHostPseudo = require('./postcss-fix-host-pseudo');
const license = require('./rollup-plugin-license');

const readFile = promisify(fs.readFile);

/**
 * Stores the suffix to append depending on build mode
 *
 * @type {{development: string, production: string}}
 */
const modeSuffixes = {
  development: '',
  production: '.min',
};

/**
 * Stores the suffix to append for render direction setting
 *
 * @type {{ltr: string, rtl: string}}
 */
const dirSuffixes = {
  ltr: '',
  rtl: '.rtl',
};

/**
 * Sets the rollup configuration based on various settings
 *
 * @param {object} [options] The build options.
 * @param {string} [options.mode=development] The build mode.
 * @param {string} [options.dir=development] The UI direction.
 * @param {Array} [options.folders] Package names as inputs
 * @returns {object} The Rollup config.
 */
function getRollupConfig({ mode = 'development', dir = 'ltr', folders = ['dotcom-shell'] } = {}) {
  const postCSSPlugins = [
    fixHostPseudo(),
    autoprefixer({
      overrideBrowsersList: [
        'last 1 version',
        'Firefox ESR',
        'not opera > 0',
        'not op_mini > 0',
        'not op_mob > 0',
        'not android > 0',
        'not edge > 0',
        'not ie > 0',
        'not ie_mob > 0',
      ],
    }),
  ];

  if (mode !== 'development') {
    postCSSPlugins.push(cssnano());
  }

  if (dir === 'rtl') {
    postCSSPlugins.push(rtlcss);
  }

  const licenseOptions = {
    whitelist: /^(carbon-components|carbon-web-components|@carbon*)$/i,
    async licenseSelf() {
      return readFile(path.resolve(__dirname, '../../../tasks/license.js'), 'utf8');
    },
  };

  const inputs = {};

  inputs.plex = `src/globals/scss/plex.scss`;

  folders.forEach(folder => {
    inputs[`${folder}${dirSuffixes[dir]}${modeSuffixes[mode]}`] = `src/components/${folder}/index.ts`;
  });

  const rollupConfig = {
    input: inputs,
    plugins: [
      multiInput(),
      resolve({
        browser: true,
        mainFields: ['jsnext', 'module', 'main'],
        extensions: ['.js', '.ts'],
      }),
      commonjs({
        include: [/node_modules/],
        sourceMap: true,
        namedExports: {
          'redux-logger/dist/redux-logger.js': ['createLogger'],
        },
      }),
      ibmdotcomIcon(),
      babel({
        extensions: ['.ts'],
        exclude: ['node_modules/**'], // only transpile our source code
        presets: ['@babel/preset-modules'],
        plugins: [
          '@babel/plugin-transform-typescript',
          '@babel/plugin-proposal-class-properties',
          ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
          '@babel/plugin-proposal-nullish-coalescing-operator',
          ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
          '@babel/plugin-proposal-optional-chaining',
          ...(mode === 'development'
            ? []
            : [
                [
                  'template-html-minifier',
                  {
                    modules: {
                      'lit-html': ['html'],
                      'lit-element': ['html'],
                    },
                    htmlMinifier: {
                      collapseWhitespace: true,
                      conservativeCollapse: true,
                      removeComments: true,
                      caseSensitive: true,
                      minifyCSS: true,
                    },
                  },
                ],
              ]),
        ],
      }),
      // We are using `carbon-web-components` code merely as the source of inheritance,
      // and we don't want to affect `carbon-web-components`' components application may define elsewhere
      babel({
        include: [/carbon-web-components\/es\/components\//i],
        plugins: [path.resolve(__dirname, 'babel-plugin-undef-custom-elements')],
      }),
      litSCSS({
        includePaths: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../../../node_modules')],
        async preprocessor(contents, id) {
          return (await postcss(postCSSPlugins).process(contents, { from: id })).css;
        },
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      ...(mode === 'development'
        ? [license(licenseOptions)]
        : [
            terser(),
            license(licenseOptions),
            /* sizes({
              report(details) {
                console.log('details', details);
                const table = new Table({
                  head: [chalk.gray.yellow('Dependency/app'), chalk.gray.yellow('Size')],
                  colAligns: ['left', 'right'],
                });
                details.totals
                  .map(item => [chalk.white.bold(item.name), item.size])
                  .forEach(item => {
                    table.push(item);
                  });
                // console.log(`Component build: ${chalk.gray.yellow(folder)}`); // eslint-disable-line no-console
                console.log(`Sizes of app/dependencies:\n${table}`); // eslint-disable-line no-console
                console.log(`Total size: ${details.total}\n\n`); // eslint-disable-line no-console
              },
            }), */
            /* {
              async generateBundle(options, bundle) {
                /!*const { code } = bundle[`ibmdotcom-web-components-${folder}${dir !== 'rtl' ? '' : '.rtl'}.min.js`];
                const gzipSize = await gzip(code);
                const { bundleSizeThreshold } = packageJson;
                console.log(`${chalk.gray.yellow(folder)}: Total size (gzipped): ${gzipSize}`); // eslint-disable-line no-console
                if (gzipSize > bundleSizeThreshold) {
                  throw new RangeError(
                    `${chalk.gray.yellow(folder)}: Exceeded size threshold of ${bundleSizeThreshold} bytes (gzipped)!`
                  );
                }*!/
              },
            }, */
          ]),
    ],
  };

  /* if (folder === 'dotcom-shell') {
    rollupConfig.plugins.push({
      resolveId(id, importer) {
        // Builds all components' styles as one Sass file so we can optimize styles across components,
        // especially of `import-once` guard
        return !/\.(css\.js|scss)$/i.test(id)
          ? null
          : this.resolve(path.resolve(__dirname, '../src/globals/scss/ibmdotcom-web-components-dotcom-shell.scss'), importer, {
              skipSelf: true,
            });
      },
    });
  } */

  return rollupConfig;
}

module.exports = getRollupConfig;
