/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import BXHeaderMenuItem from 'carbon-web-components/es/components/ui-shell/header-menu-item';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead top nav submenu item.
 *
 * @element dds-top-nav-menu-item
 */
@customElement(`${ddsPrefix}-top-nav-menu-item`)
class DDSTopNavMenuItem extends BXHeaderMenuItem {
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSTopNavMenuItem;
