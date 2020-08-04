/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, query, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import BXHeaderMenuButton from 'carbon-custom-elements/es/components/ui-shell/header-menu-button';
import focuswrap from '@carbon/ibmdotcom-utilities/es/utilities/focuswrap/focuswrap';
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
class DDSMastheadMenuButton extends BXHeaderMenuButton {
  /**
   * The handle for focus wrapping.
   */
  private _hFocusWrap: Handle | null = null;

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
    return html`
      <a id="start-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
      ${super.render()}
      <a id="end-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadMenuButton;
