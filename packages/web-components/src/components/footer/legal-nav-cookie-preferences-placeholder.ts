/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './footer.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Legal nav item, working as a placeholder for cookie perference link.
 *
 * @element dds-legal-nav-cookie-perferences-placeholder
 */
@customElement(`${ddsPrefix}-legal-nav-cookie-preferences-placeholder`)
class DDSLegalNavCookiePreferencesPlaceholder extends StableSelectorMixin(LitElement) {
  /**
   * Handles `slotchange` event.
   */
  private _handleSlotchange(event: Event) {
    // Finds new injected links
    const linkNodes = (event.target as HTMLSlotElement)
      .assignedNodes()
      .filter(node => (node as Element).tagName === 'A') as HTMLLinkElement[];
    linkNodes.forEach(node => {
      // Adds Carbon CSS classes
      node.classList.add(`${prefix}--link`);
      node.classList.add(`${prefix}--footer__link`);
      // Moves new injected links to shadow DOM
      this.shadowRoot!.appendChild(node);
    });
  }

  render() {
    const { _handleSlotchange: handleSlotchange } = this;
    return html`
      <slot @slotchange="${handleSlotchange}"></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--privacy-cp`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLegalNavCookiePreferencesPlaceholder;
