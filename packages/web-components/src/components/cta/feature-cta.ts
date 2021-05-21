/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement, html } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '@carbon/ibmdotcom-utilities/es/utilities/formatVideoCaption/formatVideoCaption.js';
import DDSFeatureCard from '../feature-card/feature-card';
import CTAMixin from '../../component-mixins/cta/cta';
import VideoCTAMixin from '../../component-mixins/cta/video';
import DDSFeatureCTAFooter from './feature-cta-footer';
import { CTA_TYPE } from './defs';
import styles from './cta.scss';

export { CTA_TYPE };

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature CTA.
 *
 * @element dds-feature-cta
 */
@customElement(`${ddsPrefix}-feature-cta`)
class DDSFeatureCTA extends VideoCTAMixin(CTAMixin(DDSFeatureCard)) {
  protected _renderCopy() {
    const {
      ctaType,
      videoDuration,
      videoName,
      formatVideoCaption: formatCaptionInEffect,
      formatVideoDuration: formatDurationInEffect,
    } = this;
    if (ctaType !== CTA_TYPE.VIDEO) {
      return super._renderCopy();
    }
    const caption = formatCaptionInEffect({
      duration: formatDurationInEffect({ duration: !videoDuration ? videoDuration : videoDuration * 1000 }),
      name: videoName,
    });

    this.captionHeading = caption;
    return html`
      <div class="bx--card__copy">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * The video caption to replace the heading with.
   */
  @property({ attribute: false })
  captionHeading;

  /**
   * The CTA type.
   */
  @property({ reflect: true, attribute: 'cta-type' })
  ctaType = CTA_TYPE.REGULAR;

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
   * The video duration.
   */
  @property({ type: Number, attribute: 'video-duration' })
  videoDuration?: number;

  /**
   * The video name.
   */
  @property({ attribute: 'video-name' })
  videoName?: string;

  /**
   * The video thumbnail URL.
   * Feature CTA does not support video thumbnail, and this property should never be set.
   */
  videoThumbnailUrl?: never;

  updated(changedProperties) {
    super.updated(changedProperties);
    const { selectorFooter } = this.constructor as typeof DDSFeatureCTA;
    if (changedProperties.has('ctaType')) {
      const { ctaType } = this;
      const footer = this.querySelector(selectorFooter);
      if (footer) {
        (footer as DDSFeatureCTAFooter).ctaType = ctaType;
      }
    }
    if (changedProperties.has('captionHeading')) {
      (this.querySelector(
        (this.constructor as typeof DDSFeatureCTA).selectorHeading
      ) as HTMLElement)!.innerText = this.captionHeading;
    }
  }

  /**
   * A selector that will return the child heading.
   */
  static get selectorHeading() {
    return `${ddsPrefix}-card-heading`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${ddsPrefix}-feature-cta-footer`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFeatureCTA;
