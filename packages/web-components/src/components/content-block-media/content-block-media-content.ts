/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, customElement, html } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './content-block-media.scss';
import DDSContentGroupSimple from '../content-group-simple/content-group-simple';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Content block media.
 *
 * @element dds-content-block-media-content
 */
@customElement(`${ddsPrefix}-content-block-media-content`)
class DDSContentBlockMediaContent extends StableSelectorMixin(DDSContentGroupSimple) {
  //  Overrides the media position in relation to another slotted components
  //  eslint-disable-next-line class-methods-use-this
  protected _renderCopy() {
    return html`
      <slot name="media"></slot>
      <slot></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-block-media-content`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSContentBlockMediaContent;
