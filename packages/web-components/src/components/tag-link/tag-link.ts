/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import styles from './tag-link.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { stablePrefix: ddsPrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Tag Link.
 *
 * @element dds-tag-link
 */
@customElement(`${ddsPrefix}-tag-link`)
class DDSTagLink extends StableSelectorMixin(LitElement) {
  /**
   * Link `href`.
   */
  @property({ reflect: true })
  href!: string;

  /**
   * The language of what `href` points to.
   */
  @property({ reflect: true })
  hreflang!: string;

  /**
   * The a11y role for `<a>`.
   */
  @property({ attribute: 'link-role' })
  linkRole!: string;

  /**
   * URLs to ping.
   */
  @property({ reflect: true })
  ping!: string;

  /**
   * The link type.
   */
  @property({ reflect: true })
  rel!: string;

  /**
   * The link target.
   */
  @property({ reflect: true })
  target!: string;

  /**
   * Handles `click` event on the `<a>`.
   */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected _handleClick(_: MouseEvent) {}

  render() {
    const { href, hreflang, linkRole, ping, rel, target, _handleClick: handleClick } = this;
    return html`
      <a
        id="link"
        role="${ifNonNull(linkRole)}"
        class="${prefix}--link"
        part="link"
        href="${ifNonNull(href)}"
        hreflang="${ifNonNull(hreflang)}"
        ping="${ifNonNull(ping)}"
        rel="${ifNonNull(rel)}"
        target="${ifNonNull(target)}"
        @click="${handleClick}"
      >
        <slot></slot>
      </a>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--tag-link`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSTagLink;
