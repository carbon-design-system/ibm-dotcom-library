/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings';
import Close from 'carbon-web-components/es/icons/close/16';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';
import DDSInputSelectItem from './input-select-item';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The container of the input select.
 *
 * @element dds-input-select
 */
@customElement(`${ddsPrefix}-input-select`)
class DDSInputSelect extends StableSelectorMixin(LitElement) {
  /**
   * Sets the input selected dropdown to closed
   */
  @property({ attribute: 'is-open', type: Boolean })
  isOpen = false;

  /**
   * sets the title value to a string
   */
  @property()
  title!: string;

  /**
   * sets the selected value attribute to selected
   */
  @property({ attribute: 'selected', type: Boolean })
  selected: boolean = false;

  /**
   * property for setting the value to a string
   */
  @property()
  value: string = '';

  /**
   * targets the last selected item
   */
  @property()
  lastValue: any;

  static get selectorItem() {
    return `${ddsPrefix}-input-select-item`;
  }

  /**
   *
   * @param event sets the selected value attribute to selected and removes the attribute from the 'lastvalue'
   * @private
   */
  protected _handleClickInner(event: MouseEvent) {
    const { eventContentStateChange } = this.constructor as typeof DDSInputSelect;
    const selected = (event.target as Element).closest(
      (this.constructor as typeof DDSInputSelect).selectorItem
    ) as DDSInputSelectItem;
    if (selected.hasAttribute('selected')) {
      selected.removeAttribute('selected');
    } else {
      if (this.lastValue) {
        this.lastValue.removeAttribute('selected');
      }
      this.selected = false;
      this.removeAttribute('selected');
      selected.setAttribute('selected', '');
    }

    this.dispatchEvent(
      new CustomEvent(eventContentStateChange, {
        bubbles: true,
        composed: true,
        detail: {
          value: selected.getAttribute('value'),
          lastValue: this.lastValue ? this.lastValue.getAttribute('value') : '',
          headerValue: this.headerValue,
        },
      })
    );
    this.lastValue = selected;
  }

  /**
   * sets the input select items to an array
   */
  @property()
  _items: any[] = [];

  /**
   * sets header-value attribute to the input selected header
   */
  @property({ attribute: 'header-value' })
  headerValue: string = '';

  static get eventTitleChange() {
    return `${ddsPrefix}-input-select-title`;
  }

  /**
   * Toggles the input select dropdown and sets the header to selected and sets the value
   *
   * @private
   */
  protected _handleClickHeader() {
    const { eventTitleChange } = this.constructor as typeof DDSInputSelect;
    this.isOpen = !this.isOpen;
    this.selected = !this.selected;
    this.dispatchEvent(
      new CustomEvent(eventTitleChange, {
        bubbles: true,
        composed: true,
        detail: {
          headerValue: this.headerValue,
        },
      })
    );
  }

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    this._items = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
  }

  render() {
    const { title } = this;
    return html`
      <div class="${prefix}--input_container">
        <div class="${prefix}--input_container-heading" tabindex="1" @click=${this._handleClickHeader}>
          ${title}
          <div class="${prefix}--close_icon">
            ${this.selected && this.isOpen ? Close() : null}
          </div>
        </div>
        <ul
          @click=${this._handleClickInner}
          class="${this.isOpen ? '' : `${prefix}--selected__option_dropdown_hidden`} ${prefix}--selected__option_dropdown"
        >
          <slot @slotchange="${this._handleSlotChange}"></slot>
        </ul>
      </div>
    `;
  }

  /**
   * The name of the custom event fired after the search content is changed upon a user gesture.
   */
  static get eventContentStateChange() {
    return `${ddsPrefix}-input-select`;
  }

  static get stableSelector() {
    return `${ddsPrefix}-input-select`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSInputSelect;
