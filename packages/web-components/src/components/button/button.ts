/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import BXBtn from 'carbon-web-components/es/components/button/button.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './button.scss';

export { BUTTON_KIND, BUTTON_SIZE } from 'carbon-web-components/es/components/button/button.js';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Expressive button.
 *
 * @element dds-btn
 */
@customElement(`${ddsPrefix}-btn`)
class DDSBtn extends BXBtn {
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSBtn;
