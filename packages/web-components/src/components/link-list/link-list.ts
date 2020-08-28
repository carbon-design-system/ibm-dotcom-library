/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { customElement, html, LitElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import sameHeight from '@carbon/ibmdotcom-utilities/es/utilities/sameHeight/sameHeight';
import styles from './link-list.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Link list type
 */
export enum LINK_LIST_TYPE {
  /**
   * Default
   */
  DEFAULT = 'default',

  /**
   * Vertical
   */
  VERTICAL = 'vertical',

  /**
   * Horizontal
   */
  HORIZONTAL = 'horizontal',

  /**
   * End of section
   */
  END = 'end',
}

/**
 * Link list.
 *
 * @element dds-link-list
 */
@customElement(`${ddsPrefix}-link-list`)
class DDSLinkList extends LitElement {
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader

  private childItems;

  @property({ reflect: true })
  type = LINK_LIST_TYPE.DEFAULT;

  static get splitLayoutClass() {
    return `${prefix}--link-list__split`;
  }

  static get linkListItemSelector() {
    return `${ddsPrefix}-link-list-item`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--link-list`;
  }

  // eslint-disable-next-line class-methods-use-this
  protected render() {
    return html`
      <h4 class="${prefix}--link-list__heading"><slot name="heading" /></h4>
      <ul name="list" class="${prefix}--link-list__list ${this.ulClasses()}">
        <slot @slotchange="${this._handleSlotChange}}" />
      </ul>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._handleResize);
  }

  private _handleResize() {
    if (this.childItems) window.requestAnimationFrame(() => sameHeight(this.childItems, 'md'));
  }

  /**
   * Returns a class-name based on the parameter type
   *
   * @protected
   */
  protected ulClasses() {
    switch (this.type) {
      case LINK_LIST_TYPE.HORIZONTAL:
        return `${prefix}--link-list__list--horizontal`;
      case LINK_LIST_TYPE.VERTICAL:
        return `${prefix}--link-list__list--vertical`;
      case LINK_LIST_TYPE.END:
        return `${prefix}--link-list__list--end`;
      default:
        return `${prefix}--link-list__list--card`;
    }
  }

  /**
   * Handler for @slotChange, toggles the split layout class and set the children link-list-item to the same height
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    this.childItems = (event.target as HTMLSlotElement)
      .assignedNodes({ flatten: true })
      .filter(elem => (elem as HTMLElement).localName === (this.constructor as typeof DDSLinkList).linkListItemSelector);
    if (this.childItems.length > 3 && this.type === LINK_LIST_TYPE.END) {
      this.classList.add((this.constructor as typeof DDSLinkList).splitLayoutClass);
    }

    sameHeight(this.childItems, 'md');
  }
}

export default DDSLinkList;
