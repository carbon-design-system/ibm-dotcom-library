/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, internalProperty, property, customElement } from 'lit-element';
import BXLink from 'carbon-web-components/es/components/link/link';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import FocusMixin from 'carbon-web-components/es/globals/mixins/focus.js';
import IBM8BarLogoH23 from '@carbon/ibmdotcom-styles/icons/svg/IBM-8bar-logo--h23.svg';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The IBM logo UI in masthead.
 *
 * @element dds-masthead-logo
 */
@customElement(`${ddsPrefix}-masthead-logo`)
class DDSMastheadLogo extends FocusMixin(HostListenerMixin(BXLink)) {
  /**
   * Search bar opened flag.
   */
  @internalProperty()
  private _hasSearchActive = false;

  /**
   * Handles toggle event from the search component.
   *
   * @param event The event.
   */
  @HostListener('parentRoot:eventToggleSearch')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleSearchToggle = (event: Event) => {
    if ((event as CustomEvent).detail.active !== undefined) {
      this._hasSearchActive = (event as CustomEvent).detail.active;
    }
  };

  /**
   * Link `href`.
   */
  @property()
  href = 'https://www.ibm.com/';

  /**
   * The shadow slot this logo UI should be in.
   */
  @property({ reflect: true })
  slot = 'brand';

  // eslint-disable-next-line class-methods-use-this
  protected _renderInner() {
    return html`
      <slot>${IBM8BarLogoH23()}</slot>
    `;
  }

  updated() {
    const { _linkNode: linkNode, _hasSearchActive: hasSearchActive } = this;
    if (linkNode) {
      linkNode.setAttribute('aria-label', 'IBM logo');
      linkNode.classList.remove(`${prefix}--link`);
      linkNode.classList.toggle(`${ddsPrefix}-ce--header__logo--has-search-active`, hasSearchActive);
    }
  }

  firstUpdated() {
    this.tabIndex = 0;
  }

  /**
   * The name of the custom event fired after the seach is toggled.
   */
  static get eventToggleSearch() {
    return `${ddsPrefix}-masthead-search-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadLogo;
