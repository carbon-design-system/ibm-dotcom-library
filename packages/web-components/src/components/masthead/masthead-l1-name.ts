/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Masthead.
 *
 * @element dds-masthead-l1
 * @slot brand - The left hand area.
 * @slot nav - The nav content.
 * @slot profile - The right hand area.
 */
@customElement(`${ddsPrefix}-masthead-l1-name`)
class DDSMastheadL1Name extends StableSelectorMixin(LitElement) {
  @property({ reflect: true })
  slot = 'name';

  @property({ reflect: true })
  url = '';

  @property({ reflect: true })
  title = '';

  static get stableSelector() {
    return `${ddsPrefix}--masthead__l1-name`;
  }

  render() {
    return html`
      <span class="${prefix}--masthead__l1-name-title">
        <a href="${this.url}">${this.title}</a>
      </span>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadL1Name;
