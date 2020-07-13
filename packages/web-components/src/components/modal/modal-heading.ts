/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import BXModalHeading from 'carbon-custom-elements/es/components/modal/modal-heading';
import styles from './modal.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Expressive modal heading.
 *
 * @element dds-modal-heading
 */
@customElement(`${ddsPrefix}-modal-heading`)
class DDSModalHeading extends BXModalHeading {
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSModalHeading;
