/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { LeavingIBMLabels, Translation } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import './leaving-ibm-modal';
import './leaving-ibm-modal-body';
import './leaving-ibm-modal-heading';
import 'carbon-web-components/es/components/modal/modal-header';
import 'carbon-web-components/es/components/modal/modal-close-button';
import 'carbon-web-components/es/components/button/button';
import styles from './leaving-ibm.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that rendres leaving IBM component labels.
 *
 * @element dds-leaving-ibm-composite
 */
@customElement(`${ddsPrefix}-leaving-ibm-composite`)
class DDSLeavingIbmComposite extends ModalRenderMixin(LitElement) {
  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage?: (string) => void;

  /**
   * The placeholder for `loadTranslation()` Redux action that will be mixed in.
   *
   * @internal
   */
  _loadTranslation?: (language?: string) => Promise<Translation>;

  /**
   * Leaving IBM modal copy
   */
  @property({ attribute: false })
  leavingIbmCopy: LeavingIBMLabels = { LEAVING001: '', LEAVING002: '', LEAVING003: '' };

  /**
   * Leaving IBM modal button label
   */
  @property({ attribute: false })
  leavingIbmButtonLabel = '';

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
   * external url triggering the leaving ibm modal.
   */
  @property({ reflect: true })
  href = '';

  firstUpdated() {
    const { language } = this;
    if (language) {
      this._setLanguage?.(language);
    }
    this._loadTranslation?.(language).catch(() => {}); // The error is logged in the Redux store
  }

  updated(changedProperties) {
    if (changedProperties.has('language')) {
      const { language } = this;
      if (language) {
        this._setLanguage?.(language);
      }
    }
  }

  renderModal() {
    const { open, leavingIbmCopy, leavingIbmButtonLabel, href } = this;
    return html`
      <dds-leaving-ibm-modal open="${open}" size="sm">
        <bx-modal-header>
          <bx-modal-close-button></bx-modal-close-button>
          <dds-leaving-ibm-modal-heading>${leavingIbmCopy?.LEAVING001}</dds-leaving-ibm-modal-heading>
        </bx-modal-header>
        <dds-leaving-ibm-modal-body href="${href}">
          <p>${leavingIbmCopy?.LEAVING002}</p>
          <span slot="supplemental">${leavingIbmCopy?.LEAVING003}</span>
        </dds-leaving-ibm-modal-body>
        <bx-modal-footer>
          <bx-btn data-autoid="${ddsPrefix}--leaving-ibm-cta" href="${href}" kind="primary">${leavingIbmButtonLabel}</bx-btn>
        </bx-modal-footer>
      </dds-leaving-ibm-modal>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeavingIbmComposite;
