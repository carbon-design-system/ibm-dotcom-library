/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, internalProperty, LitElement, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import styles from './content-group.scss';

const { prefix } = settings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  footer: '_hasFooter',
};

/**
 * Content group.
 *
 * @abstract
 */
class DDSContentGroup extends LitElement {
  /**
   * `true` if there is footer content.
   */
  @internalProperty()
  protected _hasFooter = false;

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name] || '_hasContent'] = hasContent;
  }

  /**
   * @returns The content, that may be wrapped in a Carbon grid.
   */
  protected _renderBody(): TemplateResult | string | void {
    const { _hasFooter: hasFooter } = this;
    return html`
      ${this._renderCopy()}${this._renderContent()}
      <div ?hidden="${!hasFooter}" class="${prefix}--content-group__cta-row">
        <div class="${prefix}--content-group__cta ${prefix}--content-group__cta-col">
          <slot name="footer" @slotchange="${this._handleSlotChange}"></slot>
        </div>
      </div>
    `;
  }

  /**
   * @returns The main content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderContent(): TemplateResult | string | void {
    return html`
      <div class="${prefix}--content-group__children ${prefix}--content-group__col">
        <slot></slot>
      </div>
    `;
  }

  /**
   * @returns The copy content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderCopy(): TemplateResult | string | void {
    return html`
      <slot></slot>
    `;
  }

  render() {
    return html`
      <slot name="heading"></slot>
      ${this._renderBody()}
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSContentGroup;
