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
import DDSMarkdown from '../markdown/markdown';
import styles from './cta.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Markdown content for Card CTA.
 *
 * @element dds-card-cta-markdown
 */
@customElement(`${ddsPrefix}-card-cta-markdown`)
class DDSCardCTAMarkdown extends DDSMarkdown {
  @property({ type: Boolean, attribute: 'no-bold' })
  noBold = true;

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCardCTAMarkdown;
