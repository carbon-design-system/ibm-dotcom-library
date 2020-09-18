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
import styles from './button-group.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

export enum BUTTON_TYPES {
  /**
   * Default / Primary
   */
  DEFAULT = 'primary',

  /**
   * Alternate / Tertiary
   */
  ALTERNATE = 'tertiary',
}

/**
 * Button group.
 *
 * @element dds-button-group
 */
@customElement(`${ddsPrefix}-button-group`)
class DDSButtonGroup extends LitElement {
  static get stableSelector() {
    return `${ddsPrefix}--button-group`;
  }

  static get buttonGroupItemSelector() {
    return `${ddsPrefix}-button-group-item`;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <ol>
        <slot @slotchange="${this._handleSlotChange}" />
      </ol>
    `;
  }

  /**
   * Handler for @slotchange, set the first button-group-item to kind tertiary and primary for the remaining ones
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    const childItems = (event.target as HTMLSlotElement)
      .assignedNodes()
      .filter(elem => (elem as HTMLElement).matches((this.constructor as typeof DDSButtonGroup).buttonGroupItemSelector));

    childItems.forEach((elem, index) => {
      (elem as HTMLElement).setAttribute('kind', index !== childItems.length - 1 ? BUTTON_TYPES.ALTERNATE : BUTTON_TYPES.DEFAULT);
    });

    sameHeight(childItems, 'md');
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSButtonGroup;
