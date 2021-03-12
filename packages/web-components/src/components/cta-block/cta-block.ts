import { customElement, html, internalProperty, LitElement } from 'lit-element';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import styles from './cta-block.scss';
import DDSContentItem from '../content-item/content-item';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-cta-block`)
class DDSCtaBlock extends StableSelectorMixin(DDSContentItem) {
  /**
   * Applies section attribute
   */
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'section');
    }
    let app = document.getElementsByTagName('dds-content-section-heading');

    super.connectedCallback();
  }

  render() {
    return html`
      <div class="${prefix}--content-section__grid">
        <div class="${prefix}--content-section__row">
          <div class="${prefix}--content-section__heading">
            <slot name="heading"></slot>
          </div>
          <div class="${prefix}--content-section__children">
            <div class="${prefix}--cta-block__heading">
              <slot name="group-heading"></slot>
            </div>
            <div class="${prefix}--cta-block__items">
              <slot></slot>
            </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--cta-block`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCtaBlock;
