/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSContentItem from '../content-item/content-item';
import styles from './content-block-headlines.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Content Block Headlines item
 *
 * @element dds-content-block-headlines-item
 */
@customElement(`${ddsPrefix}-content-block-headlines-item`)
class DDSContentBlockHeadlinesItem extends StableSelectorMixin(DDSContentItem) {
  render() {
    return html`
      <h4 class="bx--content-block-headlines__heading"><slot name="heading"></slot></h4>
      <p class="bx--content-block-headlines__copy"><slot name="copy"></slot></p>
      <slot name="footer"></slot>
    `;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-block-headlines-item`;
  }
}

export default DDSContentBlockHeadlinesItem;
