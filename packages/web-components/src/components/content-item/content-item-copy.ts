/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSMarkdown from '../markdown/markdown';
import './content-item-paragraph';
import styles from './content-item.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-content-item-copy`)
class DDSContentItemCopy extends StableSelectorMixin(DDSMarkdown) {
  protected get _customTags() {
    const tags = new Set(super._customTags);
    tags.add(`${ddsPrefix}-content-item-paragraph`);
    return tags;
  }

  protected get _renderer() {
    return Object.assign(super._renderer, {
      paragraph(text) {
        return `<${ddsPrefix}-content-item-paragraph>${text}</${ddsPrefix}-content-item-paragraph>`;
      },
    });
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-item__copy`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSContentItemCopy;
