/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSContentBlock from '../content-block/content-block';
import styles from './content-block-card-static.scss';
import { DDS_CONTENT_BLOCK_CARD_STATIC } from '../../globals/internal/feature-flags';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Content block variation which includes a static card group.
 *
 * @element dds-content-block-card-static
 */
class DDSContentBlockCardStatic extends StableSelectorMixin(DDSContentBlock) {

  updated() {
    this.querySelector('dds-card-group')?.setAttribute('grid-mode', 'border');
    const cardGroupItems = this.querySelectorAll((this.constructor as typeof DDSContentBlockCardStatic).selectorCardItem);
    cardGroupItems.forEach(e => {
      (e as HTMLElement).setAttribute('color-scheme', 'light');
    })
  }

  static get selectorCardItem() {
    return `${ddsPrefix}-card-group-item`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-block-card-static`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

// Define the new element
if (DDS_CONTENT_BLOCK_CARD_STATIC) {
  customElements.define(`${ddsPrefix}-content-block-card-static`, DDSContentBlockCardStatic);
}

export default !DDS_CONTENT_BLOCK_CARD_STATIC ? undefined : DDSContentBlockCardStatic;
