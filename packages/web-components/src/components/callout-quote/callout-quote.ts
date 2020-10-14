/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './callout-quote.scss';
import { DDSCalloutMixin } from '../callout/callout';
import DDSQuote from '../quote/quote';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout Data.
 *
 * @element dds-callout-data
 */
@customElement(`${ddsPrefix}-callout-quote`)
class DDSCalloutQuote extends DDSCalloutMixin(DDSQuote) {
  static styles = styles;
}

export default DDSCalloutQuote;
