/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import {
  MastheadLink,
  MastheadMenuItem,
  MastheadProfileItem,
  Translation,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import { USER_AUTHENTICATION_STATUS } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import './masthead';
import './masthead-logo';
import './masthead-menu-button';
import './masthead-global-bar';
import './masthead-profile';
import './masthead-profile-item';
import './megamenu';
import './megamenu-top-nav-menu';
import './megamenu-right-navigation';
import './megamenu-left-navigation';
import './megamenu-category-link';
import './megamenu-category-group';
import './top-nav';
import './top-nav-name';
import './top-nav-item';
import './top-nav-menu';
import './top-nav-menu-item';
import './left-nav';
import './left-nav-name';
import './left-nav-item';
import './left-nav-menu';
import './left-nav-menu-item';
import './left-nav-overlay';
import './masthead-search-composite';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Rendering target for masthead navigation items.
 */
enum NAV_ITEMS_RENDER_TARGET {
  /**
   * For top navigation.
   */
  TOP_NAV = 'top-nav',

  /**
   * For left navigation.
   */
  LEFT_NAV = 'left-nav',
}

/**
 * Component that rendres masthead from links, etc. data.
 *
 * @element dds-masthead-composite
 */
@customElement(`${ddsPrefix}-masthead-composite`)
class DDSMastheadComposite extends LitElement {
  /**
   *  Render MegaMenu content
   *
   * @param sections menu section data object
   */
  // eslint-disable-next-line class-methods-use-this
  private _renderMegaMenu(sections) {
    const highlightedItems: MastheadMenuItem[] = [];
    let viewAllLink;
    const menu: MastheadMenuItem[] = [];

    sections[0]?.menuItems?.forEach((item: MastheadMenuItem) => {
      if (item.highlighted) return highlightedItems.push(item);
      if (item.megaPanelViewAll) {
        viewAllLink = item;
        return viewAllLink;
      }
      return menu.push(item);
    });

    const hasHighlights = highlightedItems.length !== 0;
    return html`
      <dds-megamenu>
        ${hasHighlights
          ? html`
              <dds-megamenu-left-navigation>
                ${highlightedItems.map(
                  (item, i) =>
                    html`
                      <dds-megamenu-category-group
                        data-autoid="${ddsPrefix}--masthead__l0-nav-list${i}"
                        href="${item.url}"
                        title="${item.title}"
                      >
                        ${item.megapanelContent?.quickLinks?.links.map(({ title, url }, key) => {
                          return html`
                            <dds-megamenu-category-link data-autoid="-item${key}" title="${title}" href="${url}">
                            </dds-megamenu-category-link>
                          `;
                        })}
                      </dds-megamenu-category-group>
                    `
                )}
              </dds-megamenu-left-navigation>
            `
          : null}
        <dds-megamenu-right-navigation
          style-scheme="${hasHighlights ? 'left-section' : 'regular'}"
          view-all-href="${ifNonNull(viewAllLink?.url)}"
          view-all-title="${ifNonNull(viewAllLink?.title)}"
        >
          ${menu.map((item, j) => {
            return html`
              <dds-megamenu-category-group
                data-autoid="${ddsPrefix}--masthead__l0-nav-list${j + highlightedItems.length}"
                href="${item.url}"
                title="${item.title}"
              >
                ${item.megapanelContent?.quickLinks?.links.map(({ title, url }, key) => {
                  return html`
                    <dds-megamenu-category-link data-autoid="-item${key}" title="${title}" href="${url}">
                    </dds-megamenu-category-link>
                  `;
                })}
              </dds-megamenu-category-group>
            `;
          })}
        </dds-megamenu-right-navigation>
      </dds-megamenu>
    `;
  }

  /**
   * @param options The options.
   * @param options.target The target of rendering navigation items.
   * @returns The nav items.
   */
  private _renderNavItems({ target }: { target: NAV_ITEMS_RENDER_TARGET }) {
    const { navLinks } = this;
    return !navLinks
      ? undefined
      : navLinks.map((link, i) => {
          const { menuSections = [], title, url } = link;
          let sections;
          if (link.hasMegapanel) {
            sections = this._renderMegaMenu(menuSections);
          } else {
            sections = menuSections
              // eslint-disable-next-line no-use-before-define
              .reduce((acc: typeof menuItems, { menuItems }) => acc.concat(menuItems), [])
              .map(({ title: menuItemTitle, url: menuItemUrl }, j) =>
                target === NAV_ITEMS_RENDER_TARGET.TOP_NAV
                  ? html`
                      <dds-top-nav-menu-item
                        href="${menuItemUrl}"
                        title="${menuItemTitle}"
                        data-autoid="${ddsPrefix}--masthead__l0-nav--subnav-col${i}-item${j}"
                      ></dds-top-nav-menu-item>
                    `
                  : html`
                      <dds-left-nav-menu-item
                        href="${menuItemUrl}"
                        title="${menuItemTitle}"
                        data-autoid="${ddsPrefix}--masthead__l0-sidenav--subnav-col${i}-item${j}"
                      ></dds-left-nav-menu-item>
                    `
              );
          }
          if (target === NAV_ITEMS_RENDER_TARGET.TOP_NAV) {
            if (sections.length === 0) {
              return html`
                <dds-top-nav-item
                  href="${url}"
                  title="${title}"
                  data-autoid="${ddsPrefix}--masthead__l0-nav--nav-${i}"
                ></dds-top-nav-item>
              `;
            }
            if (link.hasMegapanel) {
              return html`
                <dds-megamenu-top-nav-menu
                  menu-label="${title}"
                  trigger-content="${title}"
                  data-autoid="${ddsPrefix}--masthead__l0-nav--nav-${i}"
                >
                  ${sections}
                </dds-megamenu-top-nav-menu>
              `;
            }
            return html`
              <dds-top-nav-menu
                menu-label="${title}"
                trigger-content="${title}"
                data-autoid="${ddsPrefix}--masthead__l0-nav--nav-${i}"
              >
                ${sections}
              </dds-top-nav-menu>
            `;
          }
          return sections.length === 0
            ? html`
                <dds-left-nav-item
                  href="${url}"
                  title="${title}"
                  data-autoid="${ddsPrefix}--masthead__l0-sidenav--nav-${i}"
                ></dds-left-nav-item>
              `
            : html`
                <dds-left-nav-menu title="${title}" data-autoid="${ddsPrefix}--masthead__l0-sidenav--nav-${i}">
                  ${sections}
                </dds-left-nav-menu>
              `;
        });
  }

  /**
   * The placeholder for `loadSearchResults()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadSearchResults?: (searchQueryString: string) => Promise<string[]>;

  /**
   * The placeholder for `loadTranslation()` Redux action that will be mixed in.
   *
   * @internal
   */
  _loadTranslation?: (language?: string) => Promise<Translation>;

  /**
   * The placeholder for `monitorUserStatus()` Redux action that will be mixed in.
   *
   * @internal
   */
  _monitorUserStatus?: () => void;

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage?: (language: string) => void;

  /**
   * `true` to activate the search box.
   */
  @property({ type: Boolean, attribute: 'activate-search' })
  activateSearch = false;

  /**
   * The profile items for authenticated state.
   */
  @property({ attribute: false })
  authenticatedProfileItems?: MastheadProfileItem[];

  /**
   * The brand name.
   */
  @property({ attribute: 'brand-name' })
  brandName!: string;

  /**
   * The search results to show in the UI.
   */
  @property({ attribute: false })
  currentSearchResults: string[] = [];

  /**
   * The `aria-label` attribute for the top-level container.
   */
  @property({ attribute: 'masthead-assistive-text' })
  mastheadAssistiveText!: string;

  /**
   * The `aria-label` attribute for the menu bar UI.
   */
  @property({ attribute: 'menu-bar-assistive-text' })
  menuBarAssistiveText!: string;

  /**
   * The `aria-label` attribute for the header menu button in its active state.
   */
  @property({ attribute: 'menu-button-assistive-text-active' })
  menuButtonAssistiveTextActive!: string;

  /**
   * The `aria-label` attribute for the header menu button in its active state.
   */
  @property({ attribute: 'menu-button-assistive-text-inactive' })
  menuButtonAssistiveTextInactive!: string;

  /**
   * The profile items for unauthenticated state.
   */
  @property({ attribute: false })
  unauthenticatedProfileItems?: MastheadProfileItem[];

  /**
   * The throttle timeout to run query upon user input.
   */
  @property({ type: Number, attribute: 'input-timeout' })
  inputTimeout = 200;

  /**
   * The language used for query.
   */
  @property()
  language?: string;

  /**
   * The navigation links.
   */
  @property({ attribute: false })
  navLinks?: MastheadLink[];

  /**
   * `true` to open the search dropdown.
   */
  @property({ type: Boolean, reflect: true, attribute: 'open-search-dropdown' })
  openSearchDropdown = false;

  /**
   * Value to display when the input has an empty `value`.
   */
  @property()
  searchPlaceholder?: string;

  /**
   * The user authentication status.
   */
  @property({ attribute: 'user-status' })
  userStatus?: USER_AUTHENTICATION_STATUS;

  createRenderRoot() {
    // We render child elements of `<dds-masthead-container>` by ourselves
    return this;
  }

  firstUpdated() {
    const { language } = this;
    if (language) {
      this._setLanguage?.(language);
    }
    this._loadTranslation?.(language).catch(() => {}); // The error is logged in the Redux store
    this._monitorUserStatus?.();
  }

  updated(changedProperties) {
    if (changedProperties.has('language')) {
      const { language } = this;
      if (language) {
        this._setLanguage?.(language);
        this._loadTranslation?.(language).catch(() => {}); // The error is logged in the Redux store
      }
    }
  }

  render() {
    const {
      activateSearch,
      authenticatedProfileItems,
      currentSearchResults,
      brandName,
      inputTimeout,
      mastheadAssistiveText,
      menuBarAssistiveText,
      menuButtonAssistiveTextActive,
      menuButtonAssistiveTextInactive,
      language,
      openSearchDropdown,
      searchPlaceholder,
      unauthenticatedProfileItems,
      userStatus,
      _loadSearchResults: loadSearchResults,
    } = this;
    const authenticated = userStatus === USER_AUTHENTICATION_STATUS.AUTHENTICATED;
    const profileItems = authenticated ? authenticatedProfileItems : unauthenticatedProfileItems;
    return html`
      <dds-left-nav-overlay></dds-left-nav-overlay>
      <dds-left-nav>
        ${!brandName
          ? undefined
          : html`
              <dds-left-nav-name>${brandName}</dds-left-nav-name>
            `}
        ${this._renderNavItems({ target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV })}
      </dds-left-nav>
      <dds-masthead aria-label="${ifNonNull(mastheadAssistiveText)}">
        <dds-masthead-menu-button
          button-label-active="${ifNonNull(menuButtonAssistiveTextActive)}"
          button-label-inactive="${ifNonNull(menuButtonAssistiveTextInactive)}"
        >
        </dds-masthead-menu-button>
        <dds-masthead-logo></dds-masthead-logo>
        ${!brandName
          ? undefined
          : html`
              <dds-top-nav-name>${brandName}</dds-top-nav-name>
            `}
        <dds-top-nav menu-bar-label="${ifNonNull(menuBarAssistiveText)}">
          ${this._renderNavItems({ target: NAV_ITEMS_RENDER_TARGET.TOP_NAV })}
        </dds-top-nav>
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
          <dds-masthead-profile ?authenticated="${authenticated}">
            ${profileItems?.map(
              ({ title, url }) =>
                html`
                  <dds-masthead-profile-item href="${ifNonNull(url)}">${title}</dds-masthead-profile-item>
                `
            )}
          </dds-masthead-profile>
        </dds-masthead-global-bar>
        <div class="${prefix}--masthead__overlay"></div>
      </dds-masthead>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadComposite;
