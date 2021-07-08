/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, LitElement, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings';
import Filter from 'carbon-web-components/es/icons/filter/16';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import './filter-group';
import { baseFontSize, breakpoints } from '@carbon/layout';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';
import 'carbon-web-components/es/components/checkbox/checkbox';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;
const gridBreakpoint = parseFloat(breakpoints.md.width) * baseFontSize;

@customElement(`${ddsPrefix}-filter-panel-composite`)
class DDSFilterPanelComposite extends HostListenerMixin(StableSelectorMixin(LitElement)) {
  /** host listener */
  @HostListener('document:eventContentStateChange')
  protected _handleContentStateChangeDocument = (event: CustomEvent) => {
    const { value, lastValue, headerValue } = event.detail;

    this._selectedValues = this._selectedValues.filter(e => e !== headerValue);

    if (!value) {
      this._selectedValues = this._selectedValues.filter(e => e !== value);

      if (!this._selectedValues.length) {
        this.shadowRoot!.querySelector('dds-filter-panel-modal')?.removeAttribute('has-selections');
        this.shadowRoot!.querySelector('dds-filter-panel')?.removeAttribute('has-selections');
      }
      return;
    }

    if (!this._selectedValues.includes(value)) {
      this._selectedValues.push(value);
    }

    if (lastValue && this._selectedValues.includes(lastValue)) {
      this._selectedValues = this._selectedValues.filter(e => e !== lastValue);
    }
    // enables the clear button
    if (this._selectedValues) {
      this.shadowRoot!.querySelector('dds-filter-panel-modal')?.setAttribute('has-selections', '');
      this.shadowRoot!.querySelector('dds-filter-panel')?.setAttribute('has-selections', '');
    }
  };

  /** host listener */
  @HostListener('document:eventCheckboxSelect')
  protected _handleCheckboxStateChange = (event: CustomEvent) => {
    const { value } = event.detail;
    // toggle checkbox state
    if ((event.target as HTMLElement).hasAttribute('checked')) {
      (event.target as HTMLElement).removeAttribute('checked');
      this._selectedValues = this._selectedValues.filter(e => e !== value);

      if (!this._selectedValues.length) {
        this.shadowRoot!.querySelector('dds-filter-panel-modal')?.removeAttribute('has-selections');
        this.shadowRoot!.querySelector('dds-filter-panel')?.removeAttribute('has-selections');
      }
      return;
    }

    if (!this._selectedValues.includes(value)) {
      this._selectedValues.push(value);
    }

    // enables the clear button
    if (this._selectedValues) {
      this.shadowRoot!.querySelector('dds-filter-panel-modal')?.setAttribute('has-selections', '');
      this.shadowRoot!.querySelector('dds-filter-panel')?.setAttribute('has-selections', '');
    }
  };

  @HostListener('document:eventModalClose')
  protected modalCloseEvent = () => {
    this.openFilterModal = false;
  };

  /** host listener for input select header */
  @HostListener('document:eventTitleChange')
  protected _handleTitleStateChange = (event: CustomEvent) => {
    this._selectedValues = [];
    const { headerValue } = event.detail;
    // toggle title state
    const selected = event.path[0];
    if ((selected as HTMLElement).hasAttribute('selected')) {
      (selected as HTMLElement).removeAttribute('selected');
      this._selectedValues = this._selectedValues.filter(e => e !== headerValue);
      if (!this._selectedValues.length) {
        this.shadowRoot!.querySelector('dds-filter-panel-modal')?.removeAttribute('has-selections');
        this.shadowRoot!.querySelector('dds-filter-panel')?.removeAttribute('has-selections');
      }
      return;
    }
    (selected as HTMLElement).setAttribute('selected', '');

    if (!this._selectedValues.includes(headerValue)) {
      this._selectedValues.push(headerValue);
    }

    // enables the clear button
    if (this._selectedValues) {
      this.shadowRoot!.querySelector('dds-filter-panel-modal')?.setAttribute('has-selections', '');
      this.shadowRoot!.querySelector('dds-filter-panel')?.setAttribute('has-selections', '');
    }
  };

  static get selectorInputSelect() {
    return `${ddsPrefix}-input-select`;
  }

  @property({ type: String, reflect: true })
  selectValue = '';

  /** host listener */
  @HostListener('document:eventSelectionClear')
  protected _handleClearSelection = () => {
    this._selectedValues = [];

    this._contents.forEach(group => {
      group.querySelectorAll('dds-checkbox').forEach(e => {
        e.removeAttribute('checked');
      });
      group.querySelectorAll('dds-input-select-item').forEach(e => {
        e.removeAttribute('selected');
      });
      group.querySelectorAll('dds-input-select').forEach(e => {
        e.removeAttribute('selected');
      });
    });

    // handles the regular filter clear
    this.shadowRoot?.querySelectorAll('dds-checkbox').forEach(e => {
      e.removeAttribute('checked');
    });

    // handles the regular filter clear
    this.shadowRoot?.querySelectorAll('dds-input-select-item').forEach(e => {
      e.removeAttribute('selected');
    });

    // handles the regular filter clear
    this.shadowRoot?.querySelectorAll('dds-input-select').forEach(e => {
      e.removeAttribute('selected');
    });

    // disables the button
    this.shadowRoot!.querySelector('dds-filter-panel-modal')?.removeAttribute('has-selections');
    this.shadowRoot!.querySelector('dds-filter-panel')?.removeAttribute('has-selections');
  };

  /**
   * `true` to open the locale modal.
   */
  @property({ type: Boolean })
  openFilterModal = false;

  protected _openModal() {
    this.openFilterModal = true;
  }

  @property()
  _contents: any[] = [];

  @property()
  _title: any[] = [];

  @property()
  _selectedValues: string[] = [];

  @property()
  _filterButtonTitle: string[] = [];

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    this._contents = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
  }

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleTitleSlotChange({ target }: Event) {
    this._title = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this._filterButtonTitle = this._title[0].innerText;
  }

  protected _renderButton = gridBreakpoint < document.body.clientHeight;

  render() {
    return html`
      <button class="bx--filter-button" @click=${this._openModal}>
        <div class="${prefix}--filter__modal_button">${this._filterButtonTitle} ${Filter()}</div>
      </button>

      <dds-filter-panel-modal ?open=${this.openFilterModal}>
        <slot name="heading" @slotchange="${this._handleTitleSlotChange}"></slot>
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </dds-filter-panel-modal>

      <dds-filter-panel>
        ${this._title.map(e => {
          return html`
            ${unsafeHTML((e as HTMLElement).outerHTML)}
          `;
        })}
        ${this._contents.map(e => {
          return html`
            ${unsafeHTML((e as HTMLElement).outerHTML)}
          `;
        })}
      </dds-filter-panel>
    `;
  }

  static get eventContentStateChange() {
    return `${ddsPrefix}-input-select`;
  }

  static get eventTitleChange() {
    return `${ddsPrefix}-input-select-title`;
  }

  static get eventCheckboxSelect() {
    return `${ddsPrefix}-checkbox-select`;
  }

  static get eventSelectionClear() {
    return `${ddsPrefix}-selection-clear`;
  }

  static get eventModalClose() {
    return `${prefix}-modal-beingclosed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFilterPanelComposite;
