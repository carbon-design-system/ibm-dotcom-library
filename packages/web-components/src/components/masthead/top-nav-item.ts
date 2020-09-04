/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import BXHeaderNavItem from 'carbon-web-components/es/components/ui-shell/header-nav-item.js';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead top nav item.
 *
 * @element dds-top-nav-item
 */
@customElement(`${ddsPrefix}-top-nav-item`)
class DDSTopNavItem extends BXHeaderNavItem {
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSTopNavItem;
