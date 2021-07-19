/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import ThrottedInputMixin from '../../globals/mixins/throttled-input';
import './masthead-search';
import './masthead-search-item';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that rendres masthead search from search results, etc. data.
 *
 * @element dds-masthead-search-composite
 * @slot search - The search box content.
 */
class DDSMastheadSearchComposite extends ThrottedInputMixin(HybridRenderMixin(LitElement)) {
  /**
   * The DOM element of the search UI.
   */
  private get _searchNode() {
    return this.querySelector(`${ddsPrefix}-masthead-search`);
  }

  /**
   * The query string in the search box.
   */
  private get _searchQueryString() {
    return (this._searchNode as any) /* DDSMastheadSearch */?.searchQueryString ?? '';
  }

  _handleThrottledInput() {
    const { _searchQueryString: searchQueryString } = this;
    this._loadSearchResults?.(searchQueryString).catch(() => {}); // The error is logged in the Redux store
  }

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage?: (string) => void;

  /**
   * The placeholder for `loadSearchResults()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadSearchResults?: (searchQueryString: string) => Promise<string[]>;

  /**
   * `true` to activate the search box.
   */
  @property({ type: Boolean })
  active = false;

  /**
   * The search results to show in the UI.
   */
  @property({ attribute: false })
  currentSearchResults: string[] = [];

  /**
   * The throttle timeout to run query upon user input.
   */
  @property({ type: Number })
  inputTimeout!: number;

  /**
   * The language used for query.
   */
  @property()
  language?: string;

  /**
   * `true` to open the search dropdown.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Value to display when the input has an empty `value`.
   */
  @property()
  placeholder?: string;

  /**
   * `true` sets search to active when page loads.
   */
  @property({ type: Boolean })
  searchOpenOnload = false;

  /**
   * The shadow slot this search UI should be in.
   */
  @property({ reflect: true })
  slot = 'search';

  firstUpdated() {
    const { language } = this;
    if (language) {
      this._setLanguage?.(language);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('language')) {
      const { language } = this;
      if (language) {
        this._setLanguage?.(language);
      }
    }
  }

  renderLightDOM() {
    const { active, currentSearchResults, open, placeholder, searchOpenOnload } = this;
    return html`
      <dds-masthead-search
        ?active="${active}"
        ?open="${open}"
        placeholder="${ifNonNull(placeholder)}"
        ?search-open-on-load="${searchOpenOnload}"
      >
        ${currentSearchResults.map(
          item =>
            html`
              <dds-masthead-search-item text="${item}"></dds-masthead-search-item>
            `
        )}
      </dds-masthead-search>
    `;
  }

  render() {
    // `<dda-masthead-search>` uses `search` slot
    return html`
      <slot name="search"></slot>
    `;
  }

  /**
   * The event that represents the user input gesture.
   */
  static get eventInput() {
    return `${ddsPrefix}-masthead-search-input`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

if (!customElements.get(`${ddsPrefix}-masthead-search-composite`)) {
  customElements.define(`${ddsPrefix}-masthead-search-composite`, DDSMastheadSearchComposite);
}

export default DDSMastheadSearchComposite;
