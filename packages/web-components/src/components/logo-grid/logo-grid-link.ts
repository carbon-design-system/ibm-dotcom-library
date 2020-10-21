/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { css, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import styles from './logo-grid.scss';
import DDSCardLink from '../card-link/card-link';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Logo-grid-link.
 *
 * @element dds-logo-grid-link
 */
@customElement(`${ddsPrefix}-logo-grid-link`)
class DDSLogoGridLink extends StableSelectorMixin(DDSCardLink) {
  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSLogoGridLink;
