/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import FocusMixin from 'carbon-custom-elements/es/globals/mixins/focus';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import IBM8BarLogoH65White from '@carbon/ibmdotcom-styles/icons/svg/IBM-8bar-logo--h65-white.svg';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './footer.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The IBM logo UI in footer.
 *
 * @element dds-footer-logo
 */
@customElement(`${ddsPrefix}-footer-logo`)
class DDSFooterLogo extends StableSelectorMixin(FocusMixin(LitElement)) {
  /**
   * Link `href`.
   */
  @property()
  href = 'https://www.ibm.com/';

  /**
   * The shadow slot this logo UI should be in.
   */
  @property({ reflect: true })
  slot = 'brand';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { href } = this;
    return html`
      <a class="${prefix}--footer-logo__link" href="${ifNonNull(href)}">${IBM8BarLogoH65White()}<slot></slot></a>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--footer-logo`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFooterLogo;
