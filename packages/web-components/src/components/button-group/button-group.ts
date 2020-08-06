/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { customElement, html, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import sameHeight from '@carbon/ibmdotcom-utilities/es/utilities/sameHeight/sameHeight';
import { BUTTON_TYPES } from './defs';
import styles from './button-group.scss';

export { BUTTON_TYPES };

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Button group.
 *
 * @element dds-button-group
 */
@customElement(`${ddsPrefix}-button-group`)
class DDSButtonGroup extends LitElement {
  /**
   * Handler for @slotchange, set the first button-group-item to kind tertiary and primary for the remaining ones
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    const childItems = (event.target as HTMLSlotElement)
      .assignedNodes()
      .filter(elem =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches((this.constructor as typeof DDSButtonGroup).selectorItem)
          : false
      );

    childItems.forEach((elem, index) => {
      (elem as HTMLElement).setAttribute('kind', index !== childItems.length - 1 ? BUTTON_TYPES.ALTERNATE : BUTTON_TYPES.DEFAULT);
    });

    setTimeout(() => {
      sameHeight(childItems, 'md');
    });
  }

  render() {
    return html`
      <slot @slotchange="${this._handleSlotChange}"></slot>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'list');
  }

  /**
   * A selector that will return the child items.
   */
  static get selectorItem() {
    return `${ddsPrefix}-button-group-item`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--button-group`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSButtonGroup;
