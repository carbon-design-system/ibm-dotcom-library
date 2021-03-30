/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings';
import ChevronLeft20 from 'carbon-web-components/es/icons/chevron--left/20.js';
import ChevronDown20 from 'carbon-web-components/es/icons/chevron--down/20.js';
import FocusMixin from 'carbon-web-components/es/globals/mixins/focus.js';
import { forEach } from '../../globals/internal/collection-helpers';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead left nav submenu.
 *
 * @element dds-left-nav-menu
 * @fires dds-left-nav-menu-beingtoggled
 *   The custom event fired before this side nav menu is being toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of toggling this side nav menu.
 * @fires dds-left-nav-menu-toggled The custom event fired after this side nav menu is toggled upon a user gesture.
 */
@customElement(`${ddsPrefix}-left-nav-menu`)
class DDSLeftNavMenu extends FocusMixin(LitElement) {
  /**
   * Handles user-initiated toggle request of this side nav menu.
   *
   * @param expanded The new expanded state.
   */
  private _handleUserInitiatedToggle(expanded = !this.expanded) {
    const { eventBeforeToggle, eventToggle } = this.constructor as typeof DDSLeftNavMenu;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        expanded,
      },
    };
    if (this.dispatchEvent(new CustomEvent(eventBeforeToggle, init))) {
      this.expanded = expanded;
      this.dispatchEvent(new CustomEvent(eventToggle, init));
    }
  }

  /**
   * Handler for the `click` event on the expando button.
   */
  private _handleClickExpando() {
    this._handleUserInitiatedToggle();
  }

  /**
   * Handler for the `keypress` event on the expando button.
   */
  private _handleKeydownExpando({ key }: KeyboardEvent) {
    if (key === 'Enter') {
      this._handleUserInitiatedToggle();
    }
  }

  /**
   * `true` if the menu should be in its active state.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * The back button's text.
   */
  @property({ attribute: 'back-button-text' })
  backButtonText = 'Back';

  /**
   * `true` if the menu should be open.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * The title text.
   */
  @property()
  title = '';

  updated(changedProperties) {
    if (changedProperties.has('expanded')) {
      const { selectorItem } = this.constructor as typeof DDSLeftNavMenu;
      const { expanded } = this;
      forEach(this.querySelectorAll(selectorItem), elem => {
        (elem as HTMLElement).tabIndex = expanded ? 0 : -1;
      });
    }
  }

  render() {
    const {
      active,
      backButtonText,
      expanded,
      title,
      _handleClickExpando: handleClickExpando,
      _handleKeydownExpando: handleKeydownExpando,
    } = this;
    const buttonClasses = classMap({
      [`${prefix}--side-nav__submenu`]: true,
      [`${prefix}--masthead__side-nav--submemu--selected`]: active,
    });
    return html`
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded="${String(Boolean(expanded))}"
        class="${buttonClasses}"
        @click=${handleClickExpando}
      >
        <div class="${prefix}--side-nav__submenu-content">
          <span class="${prefix}--side-nav__submenu-title">${title}</span>
          <div class="${prefix}--side-nav__icon ${prefix}--side-nav__icon--small ${prefix}--side-nav__submenu-chevron">
            ${ChevronDown20()}
          </div>
        </div>
      </button>
      <ul class="${prefix}--side-nav__menu" role="menu">
        <li class="bx--side-nav__menu-item bx--masthead__side-nav--submemu-back">
          <a
            class="bx--side-nav__link"
            role="menuitem"
            @keydown="${handleKeydownExpando}"
            @click="${handleClickExpando}"
            tabindex="0"
          >
            <span class="bx--side-nav__link-text">${ChevronLeft20()}${backButtonText}</span>
          </a>
        </li>
        <li class="bx--masthead__side-nav--submemu-title">${title}</li>
        <slot></slot>
      </ul>
    `;
  }

  /**
   * A selector that will return the menu items.
   */
  static get selectorItem() {
    return `${ddsPrefix}-left-nav-menu-item`;
  }

  /**
   * The name of the custom event fired before this side nav menu is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this side nav menu.
   */
  static get eventBeforeToggle() {
    return `${ddsPrefix}-left-nav-menu-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this side nav menu is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${ddsPrefix}-left-nav-menu-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeftNavMenu;
