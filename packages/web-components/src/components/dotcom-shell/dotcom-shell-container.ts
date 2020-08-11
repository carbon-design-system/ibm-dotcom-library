/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { pickBy } from 'lodash-es';
import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { BasicLink, BasicLinkSet, MastheadLink } from '../../globals/services-store/types/translateAPI';
import { USER_AUTHENTICATION_STATUS } from '../../globals/services-store/types/profileAPI';
import { FOOTER_SIZE } from '../footer/footer';
import '../footer/footer-container';
import { MastheadProfileItem } from '../masthead/masthead-container';
import { LocaleModalLocaleList } from '../locale-modal/locale-modal-composite';
import './dotcom-shell';
import styles from './dotcom-shell-container.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Dotcom shell.
 *
 * @element dds-dotcom-shell-container
 */
@customElement(`${ddsPrefix}-dotcom-shell-container`)
class DDSLinkWithIcon extends LitElement {
  private _footerRenderRoot: Element | null = null;

  private _mastheadRenderRoot: Element | null = null;

  private _createFooterRenderRoot() {
    const footer = this.ownerDocument.createElement(`${ddsPrefix}-footer-container`);
    this.parentNode?.insertBefore(footer, this.nextSibling);
    return footer;
  }

  private _createMastheadRenderRoot() {
    const masthead = this.ownerDocument.createElement(`${ddsPrefix}-masthead-container`);
    this.parentNode?.insertBefore(masthead, this);
    return masthead;
  }

  /**
   * `true` to activate the search box. This goes to masthead.
   */
  @property({ attribute: 'activate-search' })
  activateSearch = false;

  /**
   * The profile items for authenticated state. This goes to masthead.
   */
  @property({ attribute: false })
  authenticateProfileItems?: MastheadProfileItem[];

  /**
   * The brand name. This goes to masthead.
   */
  @property({ attribute: 'brand-name' })
  brandName?: string;

  /**
   * The g11n collator to use for sorting contry names. This goes to footer.
   */
  @property({ attribute: false })
  collatorCountryName = new Intl.Collator();

  /**
   * The throttle timeout to run query upon user input. This goes to masthead.
   */
  @property({ type: Number })
  inputTimeout?: number;

  /**
   * The footer links. This goes to footer.
   */
  @property({ attribute: false })
  footerLinks: BasicLinkSet[] = [];

  /**
   * The language to show in the UI. This goes to footer.
   */
  @property({ attribute: 'lang-display' })
  langDisplay?: string;

  /**
   * The language used for query. This goes to masthead and footer.
   */
  @property()
  language?: string;

  /**
   * The legal nav links. This goes to footer.
   */
  @property({ attribute: false })
  legalLinks: BasicLink[] = [];

  /**
   * The locale list. This goes to footer.
   */
  @property({ attribute: false })
  localeList?: LocaleModalLocaleList;

  /**
   * The nonce used for logging in. This goes to masthead.
   */
  @property({ attribute: 'login-nonce' })
  loginNonce?: string;

  /**
   * The `aria-label` attribute for the top-level container. This goes to masthead.
   */
  @property({ attribute: 'masthead-label' })
  mastheadLabel?: string;

  /**
   * The `aria-label` attribute for the menu bar UI. This goes to masthead.
   */
  @property({ attribute: 'menu-bar-label' })
  menuBarLabel?: string;

  /**
   * The `aria-label` attribute for the header menu button in its active state. This goes to masthead.
   */
  @property({ attribute: 'menu-button-label-active' })
  menuButtonLabelActive?: string;

  /**
   * The `aria-label` attribute for the header menu button in its active state. This goes to masthead.
   */
  @property({ attribute: 'menu-button-label-inactive' })
  menuButtonLabelInactive?: string;

  /**
   * `true` to open the locale modal. This goes to footer.
   */
  @property({ type: Boolean, attribute: 'open-locale-modal' })
  openLocaleModal = false;

  /**
   * Footer size. This goes to footer.
   */
  @property({ reflect: true, attribute: 'footer-size' })
  footerSize?: FOOTER_SIZE;

  /**
   * The profile items for unauthenticated state. This goes to masthead.
   */
  @property({ attribute: false })
  unauthenticatedProfileItems?: MastheadProfileItem[];

  /**
   * The navigation links. This goes to masthead.
   */
  @property({ attribute: false })
  navLinks?: MastheadLink[];

  /**
   * The user authentication status. This goes to masthead.
   */
  @property({ attribute: 'user-status' })
  userStatus?: USER_AUTHENTICATION_STATUS;

  update(changedProperties) {
    super.update(changedProperties);
    if (!this._mastheadRenderRoot) {
      this._mastheadRenderRoot = this._createMastheadRenderRoot();
    }
    const {
      activateSearch,
      authenticateProfileItems,
      brandName,
      collatorCountryName,
      mastheadLabel,
      menuBarLabel,
      menuButtonLabelActive,
      menuButtonLabelInactive,
      unauthenticatedProfileItems,
      inputTimeout,
      language,
      langDisplay,
      legalLinks,
      localeList,
      loginNonce,
      footerLinks,
      footerSize,
      openLocaleModal,
      navLinks,
      userStatus,
    } = this;
    Object.assign(
      this._mastheadRenderRoot,
      pickBy(
        {
          activateSearch,
          authenticateProfileItems,
          brandName,
          mastheadLabel,
          menuBarLabel,
          menuButtonLabelActive,
          menuButtonLabelInactive,
          unauthenticatedProfileItems,
          inputTimeout,
          language,
          loginNonce,
          navLinks,
          userStatus,
        },
        value => value !== undefined
      )
    );
    if (!this._footerRenderRoot) {
      this._footerRenderRoot = this._createFooterRenderRoot();
    }
    Object.assign(
      this._footerRenderRoot,
      pickBy(
        {
          collatorCountryName,
          language,
          langDisplay,
          legalLinks,
          links: footerLinks,
          localeList,
          openLocaleModal,
          size: footerSize,
        },
        value => value !== undefined
      )
    );
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <dds-dotcom-shell>
        <slot></slot>
      </dds-dotcom-shell>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLinkWithIcon;
