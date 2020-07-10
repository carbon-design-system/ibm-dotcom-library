/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, query, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import FocusMixin from 'carbon-custom-elements/es/globals/mixins/focus';

const { prefix } = settings;

/**
 * Link.
 */
class DDSLinkWithIcon extends FocusMixin(LitElement) {
  @query('a')
  protected _linkNode?: HTMLAnchorElement;

  /**
   * Handles `click` event on the `<a>.
   *
   * @param event The event.
   */
  protected _handleClickLink(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault(); // Stop following the link
      event.stopPropagation(); // Stop firing `onClick`
    }
  }

  /**
   * @returns The inner content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderInner() {
    return html`
      <slot></slot>
    `;
  }

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The default file name.
   */
  @property()
  download?: string;

  /**
   * Link `href`.
   */
  @property()
  href?: string;

  /**
   * The language of what `href` points to.
   */
  @property()
  hreflang?: string;

  /**
   * URLs to ping.
   */
  @property()
  ping?: string;

  /**
   * The link type.
   */
  @property()
  rel?: string;

  /**
   * The link target.
   */
  @property()
  target?: string;

  /**
   * The MIME type of the `target`.
   */
  @property()
  type?: string;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { disabled, download, href, hreflang, ping, rel, target, type } = this;
    const classes = classMap({
      [`${prefix}--link`]: true,
      [`${prefix}--link--disabled`]: disabled,
    });
    return html`
      <a
        id="button"
        role="button"
        class="${classes}"
        download="${ifNonNull(download)}"
        href="${ifNonNull(href)}"
        hreflang="${ifNonNull(hreflang)}"
        ping="${ifNonNull(ping)}"
        rel="${ifNonNull(rel)}"
        target="${ifNonNull(target)}"
        type="${ifNonNull(type)}"
        @click="${this._handleClickLink}"
      >
        ${this._renderInner()}
      </a>
    `;
  }
}

export default DDSLinkWithIcon;
