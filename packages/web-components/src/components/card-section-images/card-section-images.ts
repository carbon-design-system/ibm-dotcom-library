/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

import styles from './card-section-images.scss';
import DDSContentSection from '../content-section/content-section';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Card Section Images pattern
 *
 * @element dds-card-section-images
 */
class DDSCardSectionImages extends StableSelectorMixin(DDSContentSection) {
  /**
   * Applies section attribute
   */
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'section');
    }
    super.connectedCallback();
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-section-images`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

if (!customElements.get(`${ddsPrefix}-card-section-images`)) {
  customElements.define(`${ddsPrefix}-card-section-images`, DDSCardSectionImages);
}

export default DDSCardSectionImages;
