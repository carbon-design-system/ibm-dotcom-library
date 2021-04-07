/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './cloud-masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Cloud MegaMenu Category Heading.
 *
 * @element dds-megamenu-category-heading
 */
@customElement(`${ddsPrefix}-megamenu-category-heading`)
class DDSCloudMegamenuCategoryHeading extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCloudMegamenuCategoryHeading;
