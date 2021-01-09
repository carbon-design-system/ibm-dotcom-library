/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, internalProperty, html, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import '../horizontal-rule/horizontal-rule';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './leadspace-block.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  title: '_hasTitle',
};

/**
 * LeadSpace Block Component.
 *
 * @element dds-leadspace-block
 */
@customElement(`${ddsPrefix}-leadspace-block`)
class DDSLeadSpaceBlock extends StableSelectorMixin(LitElement) {
  /**
   * `true` if there is a title.
   */
  @internalProperty()
  protected _hasTitle = false;

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasTitle = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name] || '_hasTitle'] = hasTitle;
  }

  /**
   * Render the Leadspace Block title
   */
  protected _renderHeading() {
    const { _hasTitle: hasTitle } = this;
    return html`
      <div ?hidden="${!hasTitle}">
        <slot name="heading" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }

  render() {
    return html`
      ${this._renderHeading()}
      <slot></slot>
      <dds-hr></dds-hr>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--leadspace-block`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeadSpaceBlock;
