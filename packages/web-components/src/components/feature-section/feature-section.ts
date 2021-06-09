/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSFeatureCard from '../feature-card/feature-card';
import '../image/image';
import styles from './feature-section.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature Section.
 *
 * @element dds-feature-section
 */
@customElement(`${ddsPrefix}-feature-section`)
class DDSFeatureSection extends StableSelectorMixin(DDSFeatureCard) {
  render() {
    return html`
      <div class="${prefix}--grid ${prefix}--feature-section">
        <div class="${prefix}--row ${prefix}--feature-section__container">
          <div class="${prefix}--col-sm-4 ${prefix}--col-md-8 ${prefix}--col-lg-8 ${prefix}--feature-section__body">
            <div class="${prefix}--grid">
              <div class="${prefix}--row">
                <div class="${prefix}--col-sm-4 ${prefix}--col-lg-13">
                  <slot name="eyebrow"></slot>
                  <slot name="heading"></slot>
                  <slot name="copy"></slot>
                </div>
              </div>
            </div>
          </div>
          <div class="${prefix}--col-sm-4 ${prefix}--col-md-8 ${prefix}--col-lg-8 ${prefix}--feature-section__image">
            <slot name="image"></slot>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--feature-section`;
  }

  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSFeatureSection;
