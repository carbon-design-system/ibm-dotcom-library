/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, internalProperty, customElement, TemplateResult, query } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import BXLink from 'carbon-web-components/es/components/link/link';
import { BASIC_COLOR_SCHEME } from '../../globals/defs';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSCardFooter from './card-footer';
import styles from './card.scss';
import { PICTOGRAM_PLACEMENT } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  image: '_hasImage',
  pictogram: '_hasPictogram',
};

/**
 * Card.
 *
 * @element dds-card
 * @slot eyebrow - The eyebrow content.
 * @slot heading - The heading content.
 * @slot image - The image content.
 * @slot footer - The footer content.
 */
@customElement(`${ddsPrefix}-card`)
class DDSCard extends StableSelectorMixin(BXLink) {
  /**
   * `true` if there is image content.
   */
  @internalProperty()
  protected _hasImage = false;

  /**
   * `true` if there is copy content.
   */
  @internalProperty()
  protected _hasCopy = false;

  /**
   * `true` if there is a pictogram.
   */
  @internalProperty()
  protected _hasPictogram = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { pictogramPlacement: currentPictogramPlacement } = this;
    const { dataset, name } = target as HTMLSlotElement;
    const { pictogramPlacement } = dataset;
    if (!pictogramPlacement || pictogramPlacement === currentPictogramPlacement) {
      const hasContent = (target as HTMLSlotElement)
        .assignedNodes()
        .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
      this[slotExistencePropertyNames[name] || '_hasCopy'] = hasContent;
    }
  }

  /**
   * @returns The heading content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderHeading(): TemplateResult | string | void {
    return html`
      <slot name="heading"></slot>
    `;
  }

  /**
   * @returns The copy content.
   */
  protected _renderCopy(): TemplateResult | string | void {
    const { _hasCopy: hasCopy } = this;
    return html`
      <div ?hidden="${!hasCopy}" class="${prefix}--card__copy">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The image content.
   */
  protected _renderImage(): TemplateResult | string | void {
    return html`
      <slot name="image" @slotchange="${this._handleSlotChange}"></slot>
    `;
  }

  /**
   * @returns The disabled link content.
   */
  protected _renderDisabledLink() {
    const { _classes: classes } = this;
    return html`
      <div id="link" class="${classes}">${this._renderInner()}</div>
    `;
  }

  /**
   * @returns The inner content.
   */
  protected _renderInner() {
    const { _handleSlotChange: handleSlotChange, _hasPictogram: hasPictogram } = this;
    return html`
      ${this._renderImage()}
      <div class="${prefix}--card__wrapper ${hasPictogram ? `${prefix}--card__pictogram` : ''}">
        <div class="${prefix}--card__content">
          ${hasPictogram
            ? ''
            : html`
                <slot name="eyebrow"></slot>
              `}
          ${this.pictogramPlacement === PICTOGRAM_PLACEMENT.TOP
            ? html`
                <slot
                  name="pictogram"
                  data-pictogram-placement="${PICTOGRAM_PLACEMENT.TOP}"
                  @slotchange="${handleSlotChange}"
                ></slot>
              `
            : ''}
          ${this.pictogramPlacement !== PICTOGRAM_PLACEMENT.TOP || !hasPictogram ? this._renderHeading() : null}
          ${this.pictogramPlacement === PICTOGRAM_PLACEMENT.BOTTOM || !hasPictogram ? this._renderCopy() : ''}
          ${this.pictogramPlacement === PICTOGRAM_PLACEMENT.BOTTOM
            ? html`
                <slot
                  name="pictogram"
                  data-pictogram-placement="${PICTOGRAM_PLACEMENT.BOTTOM}"
                  @slotchange="${handleSlotChange}"
                ></slot>
              `
            : ''}
          ${hasPictogram && this.pictogramPlacement === PICTOGRAM_PLACEMENT.TOP ? this._renderHeading() : null}
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  /**
   * An optional 1px border surrounding the component.
   */
  @property({ type: Boolean, reflect: true })
  border = false;

  /**
   * The color scheme.
   * A typical use case of using another color scheme of card is having a "CTA" purpose of card at the last in card group.
   *
   * Color scheme options are: "inverse" and "light"
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = BASIC_COLOR_SCHEME.REGULAR;

  /**
   * Link `href`.
   */
  @property()
  href = '';

  /**
   * Pictogram placement
   */
  @property({ attribute: 'pictogram-placement', reflect: true })
  pictogramPlacement = PICTOGRAM_PLACEMENT.TOP;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: false,
    });
  }

  @query('div')
  protected _linkNode?: HTMLDivElement | HTMLParagraphElement;

  updated(changedProperties) {
    super.updated(changedProperties);
    const { colorScheme, href, _linkNode: linkNode } = this;
    if (changedProperties.has('colorScheme') || changedProperties.has('href')) {
      const headingText = this.querySelector(`dds-card-heading`)?.textContent;
      const copyText = this.textContent;
      const footer = this.querySelector((this.constructor as typeof DDSCard).selectorFooter);
      if (footer && href) {
        (footer as DDSCardFooter).colorScheme = colorScheme;
        (footer as DDSCardFooter).parentHref = href;
        (footer as DDSCardFooter).href = href;
        (footer as DDSCardFooter).altAriaLabel = headingText || copyText;
      }
    }
    if (linkNode) {
      linkNode.classList.add(`${prefix}--tile`);
      linkNode.classList.add(`${prefix}--card`);
      linkNode.classList.toggle(`${prefix}--tile--clickable`, Boolean(href));
      linkNode.classList.toggle(`${prefix}--card--link`, Boolean(href));
      linkNode.classList.toggle(`${prefix}--card--inverse`, colorScheme === BASIC_COLOR_SCHEME.INVERSE);
    }

    if (this._hasPictogram) {
      this.onclick = () => window.open(this.href, '_self');
    }
  }

  render() {
    return this._hasPictogram
      ? html`
          <div tabindex="0" aria-label="${this.querySelector(`dds-card-heading`)?.textContent}">${this._renderInner()}</div>
        `
      : html`
          <div>${this._renderInner()}</div>
      `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--card`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${ddsPrefix}-card-footer`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCard;
