/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '@carbon/ibmdotcom-utilities/es/utilities/formatVideoCaption/formatVideoCaption';
import DDSCardFooter from '../card/card-footer';
import CTAMixin from './mixins/cta';
import { CTA_TYPE } from './shared-enums';
import styles from './cta.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card CTA footer.
 *
 * @element dds-card-cta-footer
 */
@customElement(`${ddsPrefix}-card-cta-footer`)
class DDSCardCTAFooter extends CTAMixin(DDSCardFooter) {

  protected _renderContent() {
    const { type, _hasCopy: hasCopy } = this;
    if (type !== CTA_TYPE.VIDEO) {
      return super._renderContent();
    }
    const {
      videoDuration,
      formatVideoCaption: formatVideoCaptionInEffect,
      formatVideoDuration: formatVideoDurationInEffect,
    } = this;
    const caption = hasCopy
      ? undefined
      : formatVideoCaptionInEffect({
          duration: formatVideoDurationInEffect({ duration: !videoDuration ? videoDuration : videoDuration * 1000 }),
        });
    return html`
      <span class="${prefix}--card__cta__copy"><slot @slotchange="${this._handleSlotChange}"></slot>${caption}</span>
    `;
  }

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatVideoCaption = formatVideoCaption;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatVideoDuration = formatVideoDuration;

  /**
   * The CTA type.
   */
  @property({ reflect: true })
  type = CTA_TYPE.REGULAR;

  /**
   * The video duration.
   */
  @property({ type: Number, attribute: 'video-duration' })
  videoDuration?: number;

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCardCTAFooter;
