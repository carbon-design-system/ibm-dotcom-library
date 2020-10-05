/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSLink from '../../globals/internal/link';
import styles from './link-with-icon.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Link with icon.
 *
 * @element dds-link-with-icon
 * @slot icon - The icon.
 * @slot icon-left - The CTA icon to place at the left.
 */
@customElement(`${ddsPrefix}-link-with-icon`)
class DDSLinkWithIcon extends StableSelectorMixin(DDSLink) {
  /**
   * @returns The main content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderContent(): TemplateResult | string | void {
    return html`
      <slot name="icon-left"></slot>
      <span><slot></slot></span>
    `;
  }

  /**
   * @returns The icon content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderIcon(): TemplateResult | string | void {
    return html`
      <slot name="icon"></slot>
    `;
  }

  protected _renderInner() {
    return html`
      ${this._renderContent()}${this._renderIcon()}
    `;
  }

  updated() {
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.add(`${prefix}--link-with-icon`);
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--link-with-icon`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLinkWithIcon;
