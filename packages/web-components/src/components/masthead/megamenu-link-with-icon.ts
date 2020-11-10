/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, customElement, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSLinkWithIcon from '../link-with-icon/link-with-icon';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The style scheme for the megamenu link with icon.
 */
export enum MEGAMENU_LINK_WITH_ICON_STYLE_SCHEME {
  /**
   * view all link style.
   */
  VIEW_ALL = 'view-all',

  /**
   * category headline link style.
   */
  CATEGORY_HEADLINE = 'category-headline',

  /**
   * default link style.
   */
  DEFAULT = 'default',
}
/**
 * Megamenu link with icon.
 *
 * @element dds-megamenu-link-with-icon
 */
@customElement(`${ddsPrefix}-megamenu-link-with-icon`)
class DDSMegaMenuLinkWithIcon extends DDSLinkWithIcon {
  /**
   * link title.
   */
  @property({ reflect: true, attribute: 'style-scheme' })
  styleScheme = MEGAMENU_LINK_WITH_ICON_STYLE_SCHEME.DEFAULT;

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSMegaMenuLinkWithIcon;
