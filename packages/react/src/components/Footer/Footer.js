/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { localeSelector } from '../../internal/FeatureFlags';
import LocaleSelector from './LocaleSelector';
import { settings } from 'carbon-components';
import LegalNav from './LegalNav';

const { prefix } = settings;

/** Footer component */
class Footer extends React.Component {
  /**
   * Renders the footer component
   *
   * @returns {object} JSX object
   */
  render() {
    return (
      <footer className={`${prefix}--footer`}>
        <LegalNav
          items={[
            { text: 'Contact IBM', href: '#' },
            { text: 'Privacy', href: '#' },
            { text: 'Terms of use', href: '#' },
            { text: 'Accessibility', href: '#' },
            { text: 'Feedback', href: '#' },
            { text: 'Cookie preferences', href: '#' },
          ]}
        />

        {localeSelector ? (
          <LocaleSelector text="Load the Locale Selector!" />
        ) : null}
      </footer>
    );
  }
}

export default Footer;
