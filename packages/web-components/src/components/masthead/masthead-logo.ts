/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, customElement, LitElement } from 'lit-element';
import IBM8BarLogoH23 from '@carbon/ibmdotcom-styles/icons/svg/IBM-8bar-logo--h23.svg';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import FocusMixin from 'carbon-custom-elements/es/globals/mixins/focus';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The IBM logo UI in masthead.
 *
 * @element dds-masthead-logo
 */
@customElement(`${ddsPrefix}-masthead-logo`)
class DDSMastheadLogo extends FocusMixin(LitElement) {
  /**
   * Link `href`.
   */
  @property()
  href = 'https://www.ibm.com/';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { href } = this;
    return html`
      <a href="${ifDefined(href)}">${IBM8BarLogoH23()}<slot></slot></a>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadLogo;
