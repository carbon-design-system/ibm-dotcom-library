/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, internalProperty, property, customElement, LitElement } from 'lit-element';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import FocusMixin from 'carbon-web-components/es/globals/mixins/focus.js';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The action bar in masthead.
 *
 * @element dds-masthead-global-bar
 */
@customElement(`${ddsPrefix}-masthead-global-bar`)
class DDSMastheadGlobalBar extends FocusMixin(HostListenerMixin(LitElement)) {
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
    this._hasSearchActive = (event as CustomEvent).detail.active;
  };

  /**
   * The shadow slot this action bar should be in.
   */
  @property({ reflect: true })
  slot = 'profile';

  render() {
    const { _hasSearchActive: hasSearchActive } = this;
    const classes = classMap({
      [`${ddsPrefix}-ce--header__global__container`]: true,
      [`${ddsPrefix}-ce--header__global__container--has-search-active`]: hasSearchActive,
    });
    return html`
      <div class="${classes}"><slot></slot></div>
    `;
  }

  /**
   * The name of the custom event fired after the seach is toggled.
   */
  static get eventToggleSearch() {
    return `${ddsPrefix}-masthead-search-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadGlobalBar;
