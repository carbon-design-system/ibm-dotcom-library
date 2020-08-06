/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import DDSFeatureCardFooter from '../feature-card/feature-card-footer';
import CTAMixin from './mixins/cta';
import { CTA_TYPE } from './defs';
import styles from './cta.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature CTA footer.
 *
 * @element dds-feature-cta-footer
 */
@customElement(`${ddsPrefix}-feature-cta-footer`)
class DDSFeatureCTAFooter extends CTAMixin(DDSFeatureCardFooter) {
  /**
   * The CTA type.
   */
  @property({ reflect: true, attribute: 'cta-type' })
  ctaType = CTA_TYPE.REGULAR;

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Feature CTA footer does not support video CTA, and this property should never be set.
   */
  formatVideoCaption?: never;

  /**
   * The formatter for the video duration.
   * Feature CTA footer does not support video CTA, and this property should never be set.
   */
  formatVideoDuration?: never;

  /**
   * The video duration.
   * Feature CTA footer does not support video CTA, and this property should never be set.
   */
  videoDuration?: never;

  /**
   * The video name.
   * Feature CTA footer does not support video CTA, and this property should never be set.
   */
  videoName?: never;

  /**
   * The video thumbnail URL.
   * Card CTA footer does not support video thumbnail, and this property should never be set.
   */
  videoThumbnailUrl?: never;

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFeatureCTAFooter;
