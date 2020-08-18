/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import styles from './link-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Link list item.
 *
 * @element dds-link-list-item
 */
@customElement(`${ddsPrefix}-link-list-item`)
class DDSLinkListItem extends LitElement {
  // eslint-disable-next-line class-methods-use-this
  protected render() {
    return html`
      <slot @slotchange=${this.handleSlotChange} />
    `;
  }

  private handleSlotChange() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    if (!this.querySelector('*')?.hasAttribute('style-scheme')) {
      this.querySelector('*')?.setAttribute('style-scheme', 'link-list');
    }
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLinkListItem;
