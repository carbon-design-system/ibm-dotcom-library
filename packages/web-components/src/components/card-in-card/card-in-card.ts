/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import PlayVideo from '@carbon/ibmdotcom-styles/icons/svg/play-video.svg';
import DDSCardCTA, { CTA_TYPE } from '../cta/card-cta';
import './card-in-card-image';
import styles from './card-in-card.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card in Card.
 *
 * @element dds-card-in-card
 */
@customElement(`${ddsPrefix}-card-in-card`)
class DDSCardInCard extends StableSelectorMixin(DDSCardCTA) {
  protected _renderImage() {
    const { ctaType, videoName, videoThumbnailUrl, _hasImage: hasImage } = this;
    const thumbnail =
      hasImage || ctaType !== CTA_TYPE.VIDEO
        ? undefined
        : html`
            <dds-card-in-card-image alt="${ifNonNull(videoName)}" default-src="${ifNonNull(videoThumbnailUrl)}">
              ${PlayVideo({ slot: 'icon' })}
            </dds-card-in-card-image>
          `;
    return html`
      <slot name="image" @slotchange="${this._handleSlotChange}"></slot>${thumbnail}
    `;
  }

  // render() {
  //   return html`
  //     <div class="${prefix}--card-in-card__container">
  //       ${super.render()}
  //     </div>
  //   `;
  // }

  updated(changedProperties) {
    super.updated(changedProperties);
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.add(`${prefix}--card-in-card`);
    }
    this.onclick = () =>
      this.querySelector('dds-card-cta-footer')
        ?.shadowRoot?.querySelector(`a`)
        ?.click();
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-in-card`;
  }

  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSCardInCard;
