/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './cta-section.scss';
import DDSContentItem from '../content-item/content-item';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * List item version of Content Item.
 *
 * @element dds-cta-section-item
 */
@customElement(`${ddsPrefix}-cta-section-item`)
class DDSCTASectionItem extends StableSelectorMixin(DDSContentItem) {
  render() {
    return html`
      <div class="${prefix}--content-item">
        <slot name="heading"></slot>
        <slot></slot>
        <slot name="cta"></slot>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  protected _renderContent() {
    return html``;
  }

  // eslint-disable-next-line class-methods-use-this
  protected _renderCopy() {
    return '';
  }

  static get stableSelector() {
    return `${ddsPrefix}--cta-section-item`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSCTASectionItem;
