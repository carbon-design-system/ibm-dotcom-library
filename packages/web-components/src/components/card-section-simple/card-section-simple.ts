/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, internalProperty } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

import styles from './card-section-simple.scss';
import DDSContentSection from '../content-section/content-section';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The CTA Section pattern
 *
 * @element dds-cta-section
 * @slot heading - The text heading.
 * @slot buttons - The CTA Buttons.
 */
@customElement(`${ddsPrefix}-card-section-simple`)
class DDSCardSectionSimple extends StableSelectorMixin(DDSContentSection) {
  /**
   * `true` if there is CTA content.
   */
  @internalProperty()
  protected _hasFooter = false;

  /**
   * Applies section attribute
   */
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'section');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      ${super.render()}
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-section-simple`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCardSectionSimple;
