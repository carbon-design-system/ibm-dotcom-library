/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css, customElement, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './content-block-media.scss';
import DDSContentGroup from '../content-group/content-group';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Content block media.
 *
 * @element dds-content-block-media-content
 */
@customElement(`${ddsPrefix}-content-block-media-content`)
class DDSContentBlockMediaContent extends StableSelectorMixin(DDSContentGroup) {
  protected _renderInnerBody(): TemplateResult | string | void {
    const { _hasContent: hasContent, _hasMedia: hasMedia } = this;
    // Moves media content out of `<div class="bx--content-block__children">`
    return html`
      ${this._renderMedia()}
      <div ?hidden="${!hasContent && !hasMedia}" class="${prefix}--content-block__children">
        ${this._renderContent()}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-block-media-content`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSContentBlockMediaContent;
