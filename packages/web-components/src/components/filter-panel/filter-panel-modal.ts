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
// import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import settings from 'carbon-components/es/globals/js/settings';
import Reset from 'carbon-web-components/es/icons/reset/16';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import './filter-group';

import { baseFontSize, breakpoints } from '@carbon/layout';


import BXModal from 'carbon-web-components/es/components/modal/modal';

import styles from './filter-panel.scss';

// import 'carbon-web-components/es/components/tag/filter-tag';
import 'carbon-web-components/es/components/checkbox/checkbox';
import 'carbon-web-components/es/components/modal/modal';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

const gridBreakpoint = parseFloat(breakpoints.md.width) * baseFontSize;


@customElement(`${ddsPrefix}-filter-panel-modal`)
class DDSFilterPanelModal extends HostListenerMixin(StableSelectorMixin(BXModal)) {
  /**
   *
   * renders filter title slot
   */
  protected _renderHeading() {
    const { title } = this;
    return html`
      <slot name="heading">${title}</slot>
    `;
  }

  /**
   * the filter title
   */
  @property()
  title = '';

  @property()
  selectedValues: any[] = [];

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected _handleContentStateChange(_: CustomEvent) {}

  /** host listener */
  @HostListener('document:eventContentStateChange')
  protected _handleContentStateChangeDocument = (event: CustomEvent) => {
    const { selection } = event.detail;
    if (!this.selectedValues[selection]) {
      this._createTag(selection);
    }
  };

  protected _createTag(value) {
    const newTag = document.createElement('bx-filter-tag');
    newTag.innerHTML = value;
    // newTag.setAttribute('type', 'blue');
    // this.shadowRoot?.querySelector('dds-tag-group')?.appendChild(newTag);

    this.selectedValues[value] = newTag;

    // console.log(this.selectedValues)
  }

  protected _clearSelections() {
    this.selectedValues = [];

    // removes the
    this.shadowRoot?.querySelector('dds-input-select')?.setAttribute('selectValue', '');
    this.shadowRoot?.querySelectorAll('bx-filter-tag').forEach(e => {
      e.removeAttribute('open');
    });
  }

  /** host listener */
  protected _handleCheckboxStateChange = (value, event: CustomEvent) => {
    // remove tag upon unchecking box
    if ((event.target as HTMLElement).hasAttribute('checked')) {
      this.selectedValues[value].removeAttribute('open');
      return;
    }

    if (!this.selectedValues[value]) {
      this._createTag(value);
    } else {
      this.selectedValues[value].setAttribute('open', 'true');
    }
  };

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'dialog');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <section class="${prefix}--filter-panel__section">
        <div class="${prefix}--heading-clear">
          <div class="${prefix}--filter_heading">${this._renderHeading()}</div>
          <button class="${prefix}--clear" @click=${this._clearSelections}>
            <div class="${prefix}--clear_container">
              Clear
              <div class="${prefix}--reset_icon">${Reset()}</div>
            </div>
          </button>
        </div>
        <dds-filter-group title="My guy">
          <dds-input-select title="Content Management"></dds-input-select>
        </dds-filter-group>
        <dds-filter-group title="checkbox">
          <div class="${prefix}--checkbox-space">
            <bx-checkbox @click="${e => this._handleCheckboxStateChange('Checkbox2', e)}}" label-text="Checkbox 2">
              Checkbox 2</bx-checkbox
            >
            <bx-checkbox @click="${e => this._handleCheckboxStateChange('Checkbox4', e)}}" label-text="Checkbox 4">
              Checkbox 4</bx-checkbox
            >
          </div>
        </dds-filter-group>
        <div class="${prefix}--filter_footer">
          <bx-modal-footer>
            <bx-btn data-autoid="${ddsPrefix}--leaving-ibm-cta" href="example.com" kind="tertiary">Clear</bx-btn>
            <bx-btn data-autoid="${ddsPrefix}--leaving-ibm-cta" href="example.com" kind="primary">See Results</bx-btn>
          </bx-modal-footer>
        </div>
      </section>
    `;
  }

  static get eventContentStateChange() {
    return `${ddsPrefix}-input-select`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFilterPanelModal;
