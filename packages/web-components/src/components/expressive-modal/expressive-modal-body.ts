/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import BXModalBody from 'carbon-web-components/es/components/modal/modal-body.js';
import styles from './expressive-modal.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Expressive modal body.
 *
 * @element dds-expressive-modal-body
 */
class DDSExpressiveModalBody extends StableSelectorMixin(BXModalBody) {
  static get stableSelector() {
    return `${ddsPrefix}--expressive-modal-body`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

if (!customElements.get(`${ddsPrefix}-expressive-modal-body`)) {
  customElements.define(`${ddsPrefix}-expressive-modal-body`, DDSExpressiveModalBody);
}

export default DDSExpressiveModalBody;
