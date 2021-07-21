/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSCard from '../card/card';
import '../image/image';
import styles from './feature-card.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature Card.
 *
 * @element dds-feature-card
 */
@customElement(`${ddsPrefix}-feature-card`)
class DDSFeatureCard extends DDSCard {
  /**
   * The size property to render either Medium (default) or Large Feature Card variants.
   */
  @property()
  size;

  updated(changedProperties) {
    super.updated(changedProperties);
    const { _linkNode: linkNode } = this;
    // @ts-ignore
    const footer = this.querySelector((this.constructor as typeof DDSFeatureCard).selectorFooter);
    if (linkNode) {
      linkNode.classList.remove(`${prefix}--link`);
      linkNode.classList.add(`${prefix}--feature-card__card`);
    }
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${ddsPrefix}-feature-card-footer`;
  }

  static styles = styles;
}

export default DDSFeatureCard;
