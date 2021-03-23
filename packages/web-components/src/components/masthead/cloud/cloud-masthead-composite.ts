/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import Cookies from 'js-cookie';
import '../masthead';
import '../masthead-logo';
import '../masthead-l1';
import '../masthead-l1-name';
import '../masthead-menu-button';
import '../masthead-global-bar';
import './cloud-masthead-profile';
import '../masthead-profile-item';
import '../megamenu';
import '../megamenu-top-nav-menu';
import '../megamenu-left-navigation';
import '../megamenu-category-link';
import '../megamenu-category-group';
import '../megamenu-category-group-copy';
import '../megamenu-link-with-icon';
import '../megamenu-overlay';
import '../top-nav';
import '../top-nav-l1';
import '../top-nav-name';
import '../top-nav-item';
import '../top-nav-menu';
import '../top-nav-menu-item';
import '../left-nav';
import '../left-nav-name';
import '../left-nav-item';
import '../left-nav-menu';
import '../left-nav-menu-item';
import '../left-nav-menu-category-heading';
import '../left-nav-overlay';
import '../masthead-search-composite';
import styles from '../masthead.scss';
import DDSMastheadComposite, { NAV_ITEMS_RENDER_TARGET } from '../masthead-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that renders masthead from links, etc. data.
 *
 * @element dds-cloud-masthead-composite
 */
@customElement(`${ddsPrefix}-cloud-masthead-composite`)
class DDSCloudMastheadComposite extends DDSMastheadComposite {
  /**
   * Returns user login status (authenticated or anonymous)
   */
  private _getUserLoginStatus() {
    return Cookies.get(this.loginStatusCookieName) === '1' ? { user: 'authenticated' } : { user: 'anonymous' };
  }

  /**
   * The cookie name for determining user login status.
   */
  @property({ type: String, reflect: true })
  loginStatusCookieName = 'com.ibm.cloud.iam.LoggedIn.manual';

  render() {
    const {
      activateSearch,
      authenticatedProfileItems,
      currentSearchResults,
      platform,
      platformUrl,
      inputTimeout,
      mastheadAssistiveText,
      menuBarAssistiveText,
      menuButtonAssistiveTextActive,
      menuButtonAssistiveTextInactive,
      language,
      openSearchDropdown,
      searchPlaceholder,
      selectedMenuItem,
      unauthenticatedProfileItems,
      l1Data,
      _loadSearchResults: loadSearchResults,
    } = this;
    const loginStatus = this._getUserLoginStatus();
    const profileItems = loginStatus.user === 'authenticated' ? authenticatedProfileItems : unauthenticatedProfileItems;
    return html`
      <dds-left-nav-overlay></dds-left-nav-overlay>
      <dds-left-nav>
        ${!platform
          ? undefined
          : html`
              <dds-left-nav-name href="${ifNonNull(platformUrl)}">${platform}</dds-left-nav-name>
            `}
        ${l1Data ? undefined : this._renderNavItems({ selectedMenuItem, target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV })}
        ${l1Data ? this._renderL1Items({ selectedMenuItem, target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV }) : undefined}
      </dds-left-nav>
      <dds-masthead aria-label="${ifNonNull(mastheadAssistiveText)}">
        <dds-masthead-menu-button
          button-label-active="${ifNonNull(menuButtonAssistiveTextActive)}"
          button-label-inactive="${ifNonNull(menuButtonAssistiveTextInactive)}"
        >
        </dds-masthead-menu-button>

        ${this._renderLogo()}
        ${!platform
          ? undefined
          : html`
              <dds-top-nav-name href="${ifNonNull(platformUrl)}">${platform}</dds-top-nav-name>
            `}
        ${l1Data
          ? undefined
          : html`
              <dds-top-nav menu-bar-label="${ifNonNull(menuBarAssistiveText)}">
                ${this._renderNavItems({ selectedMenuItem, target: NAV_ITEMS_RENDER_TARGET.TOP_NAV })}
              </dds-top-nav>
            `}
        <dds-masthead-search-composite
          ?active="${activateSearch}"
          input-timeout="${inputTimeout}"
          language="${ifNonNull(language)}"
          ?open="${openSearchDropdown}"
          placeholder="${ifNonNull(searchPlaceholder)}"
          .currentSearchResults="${ifNonNull(currentSearchResults)}"
          ._loadSearchResults="${ifNonNull(loadSearchResults)}"
        ></dds-masthead-search-composite>
        <dds-masthead-global-bar>
          <dds-cloud-masthead-profile ?authenticated="${loginStatus.user === 'authenticated'}">
            ${profileItems?.map(
              ({ title, url }) =>
                html`
                  <dds-masthead-profile-item href="${ifNonNull(url)}">${title}</dds-masthead-profile-item>
                `
            )}
          </dds-cloud-masthead-profile>
        </dds-masthead-global-bar>
        ${!l1Data ? undefined : this._renderL1({ selectedMenuItem })}
        <dds-megamenu-overlay></dds-megamenu-overlay>
      </dds-masthead>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCloudMastheadComposite;
