/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Knobs for Masthead. Also used by DotcomShell.stories.js
 *
 * type {{}}
 */
import mastheadLinks from './MastheadLinks.js';
import mastheadLogo from './MastheadLogo.js';

const mastheadKnobs = {
  navigation: {
    default: 'default',
    custom: mastheadLinks,
    none: null,
  },
  platform: {
    none: null,
    platform: {
      name: 'IBM Cloud',
      url: 'https://www.ibm.com/cloud',
    },
  },
  mastheadLogo: mastheadLogo,
};

export default mastheadKnobs;
