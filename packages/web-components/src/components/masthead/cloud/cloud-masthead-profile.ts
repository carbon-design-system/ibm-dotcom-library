/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined';
import { html, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import User20 from 'carbon-web-components/es/icons/user/20.js';
import UserOnline20 from 'carbon-web-components/es/icons/user--online/20.js';
import styles from './cloud-masthead.scss';
import DDSMastheadProfile from '../masthead-profile';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Cloud-specific profile menu UI in the masthead.
 *
 * @element dds-cloud-masthead-profile
 */
@customElement(`${ddsPrefix}-cloud-masthead-profile`)
class DDSCloudMastheadProfile extends DDSMastheadProfile {
  render() {
    const { authenticated, expanded, menuLabel, triggerLabel, _handleClick: handleClick } = this;
    return html`
      <a
        role="menuitem"
        tabindex="0"
        class="${prefix}--header__menu-item ${prefix}--header__menu-title"
        href="javascript:void 0"
        aria-haspopup="menu"
        aria-expanded="${String(Boolean(expanded))}"
        aria-label="${ifDefined(triggerLabel)}"
        @click=${handleClick}
      >
        ${authenticated ? UserOnline20() : User20()}
      </a>
      <ul role="menu" class="${prefix}--header__menu" aria-label="${ifDefined(menuLabel)}">
        <slot></slot>
      </ul>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCloudMastheadProfile;
