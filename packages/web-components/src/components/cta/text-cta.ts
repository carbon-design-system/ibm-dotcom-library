/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, internalProperty, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '@carbon/ibmdotcom-utilities/es/utilities/formatVideoCaption/formatVideoCaption.js';
import DDSLinkWithIcon from '../link-with-icon/link-with-icon';
import CTAMixin from './mixins/cta';
import { CTA_TYPE } from './shared-enums';
import styles from './cta.scss';

export { CTA_TYPE };

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Text CTA.
 *
 * @element dds-text-cta
 */
@customElement(`${ddsPrefix}-text-cta`)
class DDSTextCTA extends CTAMixin(DDSLinkWithIcon) {
  /**
   * `true` if there is a non-empty default slot content.
   */
  @internalProperty()
  protected _hasContent = false;

  /**
   * Handles `slotchange` event on the default `<slot>`.
   */
  protected _handleSlotChange({ target }: { target: HTMLSlotElement }) {
    this._hasContent = target
      .assignedNodes()
      .some(node => node.nodeType !== Node.COMMENT_NODE && (node.nodeType !== Node.TEXT_NODE || node.nodeValue?.trim()));
  }

  protected _renderContent() {
    const { ctaType, _hasContent: hasContent } = this;
    if (ctaType !== CTA_TYPE.VIDEO) {
      return super._renderContent();
    }
    const {
      videoDuration,
      videoName,
      formatVideoCaption: formatVideoCaptionInEffect,
      formatVideoDuration: formatVideoDurationInEffect,
    } = this;
    const caption = hasContent
      ? undefined
      : formatVideoCaptionInEffect({
          duration: formatVideoDurationInEffect({ duration: !videoDuration ? videoDuration : videoDuration * 1000 }),
          name: videoName,
        });
    return html`
      <span><slot @slotchange="${this._handleSlotChange}"></slot>${caption}</span>
    `;
  }

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
   * Text CTA does not support video thumbnail, and this property should never be set.
   */
  videoThumbnailUrl?: never;

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSTextCTA;
