/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSCardLink from '../card-link/card-link';
import styles from './link-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Link list item.
 *
 * @element dds-link-list-item-card
 */
@customElement(`${ddsPrefix}-link-list-item-card`)
class DDSLinkListItem extends DDSCardLink {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'region');
    }
    if (this.innerText) {
      this.setAttribute('aria-label', this.innerText);
    }
    super.connectedCallback();
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSLinkListItem;
