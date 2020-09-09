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
import { CTA_TYPE } from './shared-enums';
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
  @property({ reflect: true })
  type = CTA_TYPE.REGULAR;

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFeatureCTAFooter;
