/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './content-section.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Content Section component for use with cardSection
 *
 * @element dds-content-section
 * @slot heading - Section heading
 */
@customElement(`${ddsPrefix}-content-section`)
class DDSContentSection extends StableSelectorMixin(LitElement) {
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
      <div class="${prefix}--content-section__grid">
        <div class="${prefix}--content-section__row">
          <div class="${prefix}--content-section__left">
            <slot name="heading"></slot>
            <slot name="copy"></slot>
            <slot name="footer"></slot>
          </div>
          <div class="${prefix}--content-section__children">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-section`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSContentSection;
