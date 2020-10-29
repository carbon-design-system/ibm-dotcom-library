/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { css, customElement, html, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import styles from './logo-grid.scss';
import DDSContentBlock from '../content-block/content-block';
import '../content-block/content-block-heading';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Logo grid.
 *
 * @element dds-logo-grid
 */
@customElement(`${ddsPrefix}-logo-grid`)
class DDSLogoGrid extends StableSelectorMixin(DDSContentBlock) {
  @property({ attribute: 'hide-border', reflect: true, type: Boolean })
  hideBorder = false;

  // eslint-disable-next-line class-methods-use-this
  protected _renderContent() {
    return html`
      <div class="bx--content-block__children">
        <div class="bx--logo-grid__row">
          <slot></slot>
        </div>
      </div>
    `;
  }

  protected render() {
    return html`
      <slot name="heading"></slot>
      ${this._renderBody()}
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  protected _renderCopy() {
    return '';
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
