/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSContentItemParagraph from '../content-item/content-item-paragraph';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './cta-section.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-cta-section-copy`)
class DDSCTASectionItemCopy extends StableSelectorMixin(DDSContentItemParagraph) {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}-cta-section__copy`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCTASectionItemCopy;
