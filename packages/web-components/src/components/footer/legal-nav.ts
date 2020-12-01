/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { FOOTER_SIZE } from './footer';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './footer.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Legal nav.
 *
 * @element dds-legal-nav
 */
@customElement(`${ddsPrefix}-legal-nav`)
class DDSLegalNav extends StableSelectorMixin(LitElement) {
  /**
   * Size property used for applying classes
   */
  @property()
  size = FOOTER_SIZE.REGULAR;

  /**
   * Returns a class-name based on the type parameter type
   */
  protected _getTypeClass() {
    return classMap({
      [`${prefix}--legal-nav__list`]: true,
      [`${prefix}--legal-nav__micro`]: this.size === FOOTER_SIZE.MICRO,
    });
  }

  /**
   * The shadow slot this legal nav should be in.
   */
  @property({ reflect: true })
  slot = 'legal-nav';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'complementary');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <nav class="${prefix}--legal-nav">
        <div class="${this._getTypeClass()}">
          <ul>
            <slot></slot>
          </ul>
          <slot name='locale'>
        </div>
      </nav>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--footer-legal-nav`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLegalNav;
