/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, internalProperty, customElement, LitElement, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './content-item.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  footer: '_hasFooter',
};

/**
 * Content item.
 *
 * @element dds-content-item
 * @slot media - The media content.
 * @slot heading - The heading content.
 * @slot footer - The footer (CTA) content.
 */
@customElement(`${ddsPrefix}-content-item`)
class DDSContentItem extends StableSelectorMixin(LitElement) {
  /**
   * `true` if there is a footer content.
   */
  @internalProperty()
  _hasFooter = false;

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const content = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(elem =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches((this.constructor as typeof DDSContentItem).selectorTextCTA) ||
            (elem as HTMLElement).matches((this.constructor as typeof DDSContentItem).selectorButtonGroup) ||
            (elem as HTMLElement).matches((this.constructor as typeof DDSContentItem).selectorLinkWithIcon) ||
            (elem as HTMLElement).matches((this.constructor as typeof DDSContentItem).selectorLinkList)
          : false
      );
    const hasContent = content.some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name] || '_hasCopy'] = hasContent;
  }

  /**
   * @returns The body content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderBody(): TemplateResult | string | void {
    return html`
      <slot></slot>
    `;
  }

  /**
   * @returns The footer content.
   */
  protected _renderFooter(): TemplateResult | string | void {
    const { _hasFooter: hasFooter } = this;
    return html`
      <div ?hidden="${!hasFooter}" class="${prefix}--content-item__cta">
        <slot name="footer" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }

  render() {
    return html`
      <slot name="heading"></slot>
      <div>
        <slot name="media"></slot>
      </div>
      ${this._renderBody()}${this._renderFooter()}
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-item`;
  }

  static get selectorTextCTA() {
    return `${ddsPrefix}-text-cta`;
  }

  static get selectorLinkList() {
    return `${ddsPrefix}-link-list`;
  }

  static get selectorLinkWithIcon() {
    return `${ddsPrefix}-link-with-icon`;
  }

  static get selectorButtonGroup() {
    return `${ddsPrefix}-button-group`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSContentItem;
