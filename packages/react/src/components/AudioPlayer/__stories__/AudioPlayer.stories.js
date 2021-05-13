/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { array, boolean, text } from '@storybook/addon-knobs';
import AudioPlayer from '../AudioPlayer';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|AudioPlayer',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
  },
};

export const Default = ({ parameters }) => {
  const {
    audioId,
    autoPlay,
    showCaptionMenu,
    showPlaybackRateMenu,
    playbackRates,
  } = parameters?.props?.AudioPlayer ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-md-8 bx--col-lg-16 bx--col-xlg-16 bx--col-max-16">
          <div
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AudioPlayer
              audioId={audioId}
              hasSettings={true}
              showCaptionMenu={showCaptionMenu}
              showPlaybackRateMenu={showPlaybackRateMenu}
              playbackRates={playbackRates}
              autoPlay={autoPlay}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    knobs: {
      AudioPlayer: ({ groupId }) => ({
        audioId: text("Kaltura's Audio ID (audioId):", '1_8ki0vj70', groupId),
        // audioId: text('Kaltura\'s Audio ID', '1_9h94wo6b', groupId),
        autoPlay: boolean('Start widget with audio (autoPlay)', false, groupId),
        showCaptionMenu: boolean(
          'Show caption menu (showCaptionMenu):',
          true,
          groupId
        ),
        showPlaybackRateMenu: boolean(
          'Show Playback Speed Rate Menu (showPlaybackRateMenu):',
          true,
          groupId
        ),
        playbackRates: array(
          'The available velocities/rates of the playback (playbackRates):',
          [1, 1.5, 2],
          ',',
          groupId
        ),
      }),
    },
  },
};
