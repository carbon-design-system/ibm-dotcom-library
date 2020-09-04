/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, internalProperty, property, query, customElement } from 'lit-element';
import { breakpoints } from '@carbon/layout/es';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import on from 'carbon-components/es/globals/js/misc/on';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import BXHeaderMenuButton from 'carbon-web-components/es/components/ui-shell/header-menu-button.js';
import focuswrap from '@carbon/ibmdotcom-utilities/es/utilities/focuswrap/focuswrap.js';
import Handle from '../../globals/internal/handle';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Toggle button for masthead left nav.
 *
 * @element dds-masthead-menu-button
 */
@customElement(`${ddsPrefix}-masthead-menu-button`)
class DDSMastheadMenuButton extends HostListenerMixin(BXHeaderMenuButton) {
  /**
   * The handle for focus wrapping.
   */
  private _hFocusWrap: Handle | null = null;

  /**
   * Media query listener handler.
   */
  private _mqHandler: Handle | null = null;

  /**
   * Search bar opened flag.
   */
  @internalProperty()
  private _openedSearch = false;

  /**
   * Medium breakpoint flag.
   */
  @internalProperty()
  private _responsiveMd = false;

  /**
   * Handles toggle event from the search component.
   *
   * @param event The event.
   */
  @HostListener('parentRoot:eventToggleSearch')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleSearchToggle = (event: Event) => {
    this._openedSearch = (event as CustomEvent).detail.active;
  };

  /**
   * Handles media query event.
   *
   * @param event The event.
   */
  private _handleMediaQuery(event: Event) {
    this._responsiveMd = (event as MediaQueryListEvent).matches;
  }

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#start-sentinel')
  private _startSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#end-sentinel')
  private _endSentinelNode!: HTMLAnchorElement;

  /**
   * The `<button>`.
   */
  @query(`.${prefix}--header__menu-trigger`)
  private _buttonNode!: HTMLButtonElement;

  /**
   * The shadow slot this toggle button should be in.
   */
  @property({ reflect: true })
  slot = 'brand';

  connectedCallback() {
    super.connectedCallback();

    const mqMedium = this.ownerDocument?.defaultView?.matchMedia(`(max-width: ${breakpoints.md.width})`);
    this._responsiveMd = mqMedium ? mqMedium.matches : false;

    this._mqHandler = on(mqMedium, 'change', this._handleMediaQuery.bind(this));
  }

  disconnectedCallback() {
    if (this._mqHandler) {
      this._mqHandler = this._mqHandler.release();
    }

    super.disconnectedCallback();
  }

  focus() {
    const { _buttonNode: buttonNode } = this;
    if (buttonNode) {
      buttonNode.focus();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('active')) {
      const { active, _startSentinelNode: startSentinelNode, _endSentinelNode: endSentinelNode } = this;
      if (active) {
        this._hFocusWrap = focuswrap(this.shadowRoot!, [startSentinelNode, endSentinelNode]);
      } else if (this._hFocusWrap) {
        this._hFocusWrap = this._hFocusWrap.release();
      }
    }
  }

  render() {
    return this._openedSearch && this._responsiveMd
      ? html``
      : html`
          <a id="start-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
          ${super.render()}
          <a id="end-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
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

export default DDSMastheadMenuButton;
