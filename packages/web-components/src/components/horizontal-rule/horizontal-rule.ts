/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import styles from './horizontal-rule.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Horizontal Rule
 *
 * @element dds-hr
 */
@customElement(`${ddsPrefix}-hr`)
class DDSHorizontalRule extends LitElement {
  /**
   * Style of the HR (solid (default) | dashed)
   */
  @property({ attribute: 'type', reflect: true })
  type = 'solid';

  /**
   * Length of the HR
   * (fluid (default) | small | medium | large)
   */
  @property({ attribute: 'size', reflect: true })
  size = 'fluid';

  /**
   * Contrast of the HR
   * (medium-contrast (default) | low-contrast | high-contrast)
   */
  @property({ attribute: 'contrast', reflect: true })
  contrast = 'medium-contrast';

  /**
   * Weight of the HR
   * (thin (default) | thick)
   */
  @property({ attribute: 'weight', reflect: true })
  weight = 'thin';

  render() {
    return super.render();
  }

  static get stableSelector() {
    return `${ddsPrefix}--hr`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSHorizontalRule;
