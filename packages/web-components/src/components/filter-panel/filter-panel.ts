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
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import './filter-group';

import styles from './filter-panel.scss';

import 'carbon-web-components/es/components/tag/filter-tag';
import 'carbon-web-components/es/components/checkbox/checkbox';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-filter-panel`)
class DDSFilterPanel extends HostListenerMixin(StableSelectorMixin(LitElement)) {
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
    newTag.setAttribute('type', 'blue');
    this.shadowRoot?.querySelector('dds-tag-group')?.appendChild(newTag);

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

  render() {
    return html`
      <section class="${prefix}--filter-panel__section">
        <button class="${prefix}--clear" @click=${this._clearSelections}>Clear all Filters</button>
        <div class="${prefix}--bubbles"><dds-tag-group></dds-tag-group></div>
        <div class="${prefix}--filter_heading">${this._renderHeading()}</div>
        <dds-filter-group title="My guy">
          <dds-input-select title="Content Management"></dds-input-select>
        </dds-filter-group>
        <dds-filter-group title="checkbox">
          <div class="${prefix}--checkbox-space">
            <bx-checkbox @click="${e => this._handleCheckboxStateChange('Checkbox2', e)}}" label-text="Checkbox 2"
              >Checkbox 2</bx-checkbox
            >
            <bx-checkbox @click="${e => this._handleCheckboxStateChange('Checkbox4', e)}}" label-text="Checkbox 4"
              >Checkbox 4</bx-checkbox
            >
          </div>
        </dds-filter-group>
        <div class="${prefix}--filter_footer"></div>
      </section>
    `;
  }

  static get eventContentStateChange() {
    return `${ddsPrefix}-input-select`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFilterPanel;
