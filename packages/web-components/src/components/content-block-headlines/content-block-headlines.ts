/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Part } from 'lit-html';
import { css, customElement, html, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSContentBlock from '../content-block/content-block';
import styles from './content-block-headlines.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Content Block Headlines
 *
 * @element dds-content-block-headlines
 */
@customElement(`${ddsPrefix}-content-block-headlines`)
class DDSContentBlockHeadlines extends StableSelectorMixin(DDSContentBlock) {
  /**
   * The CSS class list for the container (grid) node.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _getContainerClasses(): string | ((part: Part) => void) {
    return `${prefix}--content-layout ${prefix}--content-layout--with-headlines ${prefix}--layout--border`;
  }

  /**
   * @returns The non-header, non-complementary contents.
   */
  protected _renderBody(): TemplateResult | string | void {
    const { _hasContent: hasContent, _hasCopy: hasCopy, _hasMedia: hasMedia } = this;
    return html`
      <div ?hidden="${!hasContent && !hasCopy && !hasMedia}" class="${prefix}--content-layout__body">
        ${super._renderBody()}
      </div>
    `;
  }

  protected _renderInnerBody(): TemplateResult | string | void {
    const { _hasContent: hasContent, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasContent}" class="${prefix}--content-block-headlines__item-container">
        <slot @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  protected _renderContent(): TemplateResult | string | void {
    const { _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot @slotchange="${handleSlotChange}"></slot>
    `;
  }

  protected _renderFooter(): TemplateResult | string | void {
    const { _hasFooter: hasFooter, _handleSlotChange: handleSlotChange } = this;
    // TODO: See if we can remove the surrounding `<div>`
    return html`
      <div ?hidden="${!hasFooter}">
        <slot name="footer" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  render() {
    return html`
      <div class="${this._getContainerClasses()}">
        ${this._renderHeading()}${this._renderBody()}${this._renderComplementary()}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}-content-block-headlines`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSContentBlockHeadlines;
