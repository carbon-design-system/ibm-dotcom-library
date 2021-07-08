/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import './filter-group';
import BXModal from 'carbon-web-components/es/components/modal/modal';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';
import 'carbon-web-components/es/components/checkbox/checkbox';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-filter-panel-modal`)
class DDSFilterPanelModal extends HostListenerMixin(StableSelectorMixin(BXModal)) {
  /**
   *
   * renders filter title slot
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderHeading() {
    return html`
      <slot name="heading"></slot>
    `;
  }

  @property()
  selectedValues: any[] = [];

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected _handleContentStateChange(_: CustomEvent) {}

  /**
   * Handles `click` event on the `<input>` in the shadow DOM.
   */
  protected _handleClear() {
    const { eventSelectionClear } = this.constructor as typeof DDSFilterPanelModal;
    this.dispatchEvent(
      new CustomEvent(eventSelectionClear, {
        bubbles: true,
        composed: true,
        detail: {
          clear: true,
        },
      })
    );
  }

  @property({ attribute: 'has-selections', type: Boolean })
  hasSelections = false;

  /**
   * Handles user-initiated close request of this modal.
   * @param triggeredBy The element that triggered this close request.
   */
  private _handleUserInitiatedClose(triggeredBy: EventTarget | null) {
    if (this.open) {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy,
        },
      };
      if (this.dispatchEvent(new CustomEvent((this.constructor as typeof BXModal).eventBeforeClose, init))) {
        this.open = false;
        this.dispatchEvent(new CustomEvent((this.constructor as typeof BXModal).eventClose, init));
      }
    }
  }

  static get eventBeforeClose() {
    return `${prefix}-modal-beingclosed`;
  }

  render() {
    return html`
      <a id="start-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
      <section class="${prefix}--filter-panel__section bx--modal-container">
        <div class="${prefix}--heading-clear">
          <div class="${prefix}--filter_heading">${this._renderHeading()}</div>
        </div>
        <slot></slot>
        <bx-modal-footer>
          <bx-btn ?disabled="${!this.hasSelections}" @click=${this._handleClear} kind="tertiary">Clear</bx-btn>
          <bx-btn @click=${this._handleUserInitiatedClose} kind="primary">See Results</bx-btn>
        </bx-modal-footer>
      </section>
      <a id="end-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
    `;
  }

  static get eventSelectionClear() {
    return `${ddsPrefix}-selection-clear`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFilterPanelModal;
