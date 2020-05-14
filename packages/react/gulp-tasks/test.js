/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { Server } = require('karma');

const config = require('./config');

const { cloptions, testsDir } = config;
const {
  browsers,
  specs,
  keepalive,
  random,
  useExperimentalFeatures,
  verbose,
} = cloptions;

module.exports = {
  a11y(done) {
    process.env.AAT_VERBOSE = !!verbose;
    new Server(
      {
        configFile: path.resolve(
          __dirname,
          '..',
          testsDir,
          'karma-accessibility-checker.conf.js'
        ),
        singleRun: !keepalive,
        customConfig: {
          browsers, // We'll massage browser list in `karma.config.js`
          random,
          specs,
          useExperimentalFeatures,
          verbose,
        },
      },
      done
    ).start();
  },
};
