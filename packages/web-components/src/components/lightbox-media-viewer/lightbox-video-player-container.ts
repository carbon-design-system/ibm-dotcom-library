/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import DDSVideoPlayerContainer from '../video-player/video-player-container';
import './lightbox-video-player';
import styles from './lightbox-video-player-container.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Container component for lightbox media viewer, works with video data.
 *
 * @element dds-lightbox-video-player-container
 */
@customElement(`${ddsPrefix}-lightbox-video-player-container`)
class DDSLightboxMediaViewerContainer extends DDSVideoPlayerContainer {
  createLightRenderRoot() {
    return this.querySelector(`${ddsPrefix}-lightbox-media-viewer-body`);
  }

  renderLightDOM() {
    const { formatCaption, hideCaption, _description: description, _duration: duration, _name: name } = this;
    return html`
      <dds-lightbox-video-player
        description="${ifNonNull(description)}"
        duration="${ifNonNull(duration)}"
        name="${ifNonNull(name)}"
        ?hide-caption="${hideCaption}"
        .formatCaption="${ifNonNull(formatCaption)}"
      >
      </dds-lightbox-video-player>
    `;
  }

  /**
   * A selector selecting the video player component.
   */
  static get selectorVideoPlayer() {
    return `${ddsPrefix}-lightbox-video-player`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLightboxMediaViewerContainer;
