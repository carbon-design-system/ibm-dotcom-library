/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import styles from './cta-block.scss';
import DDSContentItem from '../content-item/content-item';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-cta-block`)
class DDSCtaBlock extends StableSelectorMixin(DDSContentItem) {
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
          <div class="${prefix}--content-section__heading">
            <slot name="heading"></slot>
          </div>
          <div class="${prefix}--content-section__children">
            <div class="${prefix}--cta-block__group">
              <slot name="group-heading"></slot>
              <slot name="group-copy"></slot>
              <slot name="group-cta"></slot>
            </div>
            <div class="${prefix}--cta-block__items">
              <slot></slot>
            </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--cta-block`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCtaBlock;
