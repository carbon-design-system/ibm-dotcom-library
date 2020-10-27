/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSVideoPlayerContainer from '../video-player/video-player-container';
import styles from './content-block-simple.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature Card Block Large.
 *
 * @element dds-feature-card-block-large
 */
@customElement(`${ddsPrefix}-content-block-simple__media-video`)
class DDSContentBlockSimpleMediaVideo extends DDSVideoPlayerContainer {
  /**
   * The shadow slot this image with caption should be in.
   */
  @property({ reflect: true })
  slot = 'media';

  static styles = styles;
}

export default DDSContentBlockSimpleMediaVideo;
