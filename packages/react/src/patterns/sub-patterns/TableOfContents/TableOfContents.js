/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';

import Layout from '../Layout/Layout';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import { settings } from 'carbon-components';

import TOCDesktop from './TOCDesktop';
import TOCMobile from './TOCMobile';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * loops into the array of elements and returns the values
 *
 * @private
 * @returns {Array} returns elemenrt name and data title
 */
const _findMenuItems = () => {
  const eles = document.querySelectorAll('a[name]');
  const menuItems = [];
  eles.forEach(element => {
    if (element.getAttribute('name') !== 'menuLabel') {
      menuItems.push({
        id: element.getAttribute('name'),
        title: element.getAttribute('data-title'),
      });
    }
  });
  return menuItems;
};

/**
 * Table of Contents pattern
 *
 * @param {object} props props object
 * @param {object} props.menuItems menu items object
 * @param {string} props.menuLabel mobile menu label
 * @param {*} props.children children property of component
 * @returns {*} JSX Object
 */
const TableOfContents = ({ menuItems, children, menuLabel, theme }) => {
  const [useMenuItems, setUseMenuItems] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  useEffect(() => {
    if (menuItems && menuItems.length) {
      setUseMenuItems([...menuItems]);
    } else {
      setUseMenuItems(_findMenuItems());
    }
  }, [menuItems]);

  useEffect(() => {
    let id = useMenuItems[0] ? useMenuItems[0].id : '';
    let title = useMenuItems[0] ? useMenuItems[0].title : '';
    if (id === 'menuLabel' && useMenuItems[1]) {
      id = useMenuItems[1].id;
      title = useMenuItems[1].title;
    }

    setSelectedId(id);
    setSelectedTitle(title);
  }, [useMenuItems]);

  useEffect(() => {
    scrollStop(setSelectedItem);
  });

  /**
   * Set selected id & title
   *
   */
  const setSelectedItem = () => {
    console.log('useMenuItems', useMenuItems);
    const elems = getElemsInView();
    const id = elems[0] || useMenuItems[0].id;
    const filteredItems = useMenuItems.filter(menu => {
      if (id !== 'undefined') {
        return menu.id === id;
      }
    });
    const title = filteredItems[0].title;
    setSelectedId(id);
    setSelectedTitle(title);
  };

  /**
   * Check whether provided anchor tags are in visible viewport
   *
   * @returns {Array} array of name attributes
   */
  const getElemsInView = () => {
    const eles = document.querySelectorAll('a[name]');
    let elesInView = [];
    eles.forEach(element => {
      const bounding = element.getBoundingClientRect();
      if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
          (root.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
          (root.innerWidth || document.documentElement.clientWidth)
      ) {
        elesInView.push(element.getAttribute('name'));
      }
    });
    return elesInView;
  };

  /**
   * Detect scroll stop event and run callback function
   *
   * @param {*} callback callback function
   */
  const scrollStop = callback => {
    if (!callback || typeof callback !== 'function') return;
    let isScrolling;
    root.addEventListener(
      'scroll',
      () => {
        root.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          callback();
        }, 66);
      },
      false
    );
  };

  /**
   * Sets the selected menu item
   *
   * @param {*} id selected id of menu item
   * @param {*} title selected title of menu item
   */
  const updateState = (id, title) => {
    setSelectedId(id);
    setSelectedTitle(title);
  };

  /**
   * sets the class name based on theme type
   *
   * @private
   * @param {string} theme theme type ( g100 | white/default )
   * @returns {string} theme css class names
   */
  const _setTheme = theme => {
    return theme && `${prefix}--tableofcontents--${theme}`;
  };

  /**
   * Props for the Layout component
   * @type {{marginBottom: string, type: string, marginTop: string}}
   */
  const layoutProps = {
    type: '1-3',
    marginTop: 'none',
    marginBottom: 'none',
  };

  /**
   * Props for TOCDesktop and TOCMobile
   * @type {{
   * updateState: updateState,
   * selectedId: string,
   * menuItems: Array,
   * selectedTitle: string,
   * menuLabel: string
   * }}
   */
  const props = {
    menuItems: useMenuItems,
    selectedId,
    selectedTitle,
    menuLabel,
    updateState,
  };

  /**
   * Render TableOfContents pattern
   *
   * @returns {*} JSX Object
   */
  return (
    <section
      data-autoid={`${stablePrefix}--tableofcontents`}
      className={classNames(`${prefix}--tableofcontents`, _setTheme(theme))}>
      <Layout {...layoutProps}>
        <div
          style={{ position: 'sticky', top: '0' }}
          className={`${prefix}--tableofcontents__sidebar`}
          data-sticky="true">
          <div className={`${prefix}--tableofcontents__mobile-top`}></div>
          <TOCDesktop {...props} />
          <TOCMobile {...props} />
        </div>
        <div className={`${prefix}--tableofcontents__content`}>
          <div className={`${prefix}--tableofcontents__content-wrapper`}>
            {children}
          </div>
        </div>
      </Layout>
    </section>
  );
};

TableOfContents.propTypes = {
  menuItems: PropTypes.array,
  children: PropTypes.object,
  menuLabel: PropTypes.string,
  theme: PropTypes.string,
};

export default TableOfContents;
