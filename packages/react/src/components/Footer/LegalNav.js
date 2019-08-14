/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { Link } from 'carbon-components-react';

const { prefix } = settings;

/** Footer Legal Nav component */
class LegalNav extends React.Component {
  /**
   * Renders the legal nav component
   *
   * @returns {object} JSX object
   */
  render() {
    return (
      <aside className={`${prefix}--legal-nav__container`}>
        <nav className={`${prefix}--legal-nav`}>
          <ul className={`${prefix}--legal-nav__list`}>
            {this.renderListItems()}
          </ul>
        </nav>
      </aside>
    );
  }

  /**
   * Loops through and renders list items for legal nav
   *
   * @returns {object} JSX object
   */
  renderListItems() {
    const items = [];

    for (let i = 0; i < this.props.items.length; i += 1) {
      const item = this.props.items[i];

      items.push(
        <li className={`${prefix}--legal-nav__list-item`}>
          <Link href={item.url}>{item.title}</Link>
        </li>
      );
    }

    return items;
  }
}

LegalNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default LegalNav;
