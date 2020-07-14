/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import DDSCard from '../card/card';
import styles from './card-link.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card Link.
 *
 * @element dds-card-link
 */
@customElement(`${ddsPrefix}-card-link`)
class DDSCardLink extends DDSCard {
  updated(changedProperties) {
    super.updated(changedProperties);
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.add(`${prefix}--card__CTA`);
      linkNode.classList.add(`${prefix}--card-link`);
      if (this.hasAttribute('disabled')) linkNode.classList.add(`${prefix}--card__CTA--disabled`);
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-link`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCardLink;
