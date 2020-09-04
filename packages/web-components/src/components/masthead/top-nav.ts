/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement, html, internalProperty } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import BXHeaderNav from 'carbon-web-components/es/components/ui-shell/header-nav.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead top nav.
 *
 * @element dds-top-nav
 */
@customElement(`${ddsPrefix}-top-nav`)
class DDSTopNav extends StableSelectorMixin(HostListenerMixin(BXHeaderNav)) {
  /**
   * Hide top nav flag.
   */
  @internalProperty()
  private _hideNav = false;

  /**
   * Handles toggle event from the search component.
   *
   * @param event The event.
   */
  // private _handleSearchToggle: (event: Event) => void;
  @HostListener('parentRoot:eventToggleSearch')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleSearchToggle = (event: Event) => {
    this._hideNav = (event as CustomEvent).detail.active;
  };

  /**
   * `true` to hide the divider.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-divider' })
  hideDivider = false;

  render() {
    return this._hideNav ? html`` : super.render();
  }

  static get stableSelector() {
    return `${ddsPrefix}--masthead__l0-nav`;
  }

  /**
   * The name of the custom event fired after the seach is toggled.
   */
  static get eventToggleSearch() {
    return `${ddsPrefix}-masthead-search-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSTopNav;
