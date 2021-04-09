/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { css, customElement, html, property, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import styles from './logo-grid.scss';
import DDSContentBlock from '../content-block/content-block';
import '../content-block/content-block-heading';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Logo grid.
 *
 * @element dds-logo-grid
 */
@customElement(`${ddsPrefix}-logo-grid`)
class DDSLogoGrid extends StableSelectorMixin(DDSContentBlock) {
  protected _renderInnerBody() {
    const { _hasContent: hasContent, _hasMedia: hasMedia } = this;
    return html`
      <div ?hidden="${!hasContent && !hasMedia}" class="${prefix}--content-block__children ${prefix}--content-layout__body">
        <div class="${prefix}--logo-grid__row">
          ${this._renderContent()}${this._renderMedia()}
        </div>
      </div>
    `;
  }

  /**
   * @returns The footer content.
   */
  protected _renderFooter(): TemplateResult | string | void {
    const { _hasFooter: hasFooter } = this;
    return html`
      <div ?hidden="${!hasFooter}" class="${prefix}--content-block__cta-row">
        <div class="${prefix}--content-block__cta ${prefix}-content-block__cta-col">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  @property({ attribute: 'hide-border', reflect: true, type: Boolean })
  hideBorder = false;

  render() {
    return html`
      <div class="${prefix}--content-layout--logo-grid">
        <slot name="heading"></slot>
        ${this._renderBody()}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--logo-grid`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSLogoGrid;
