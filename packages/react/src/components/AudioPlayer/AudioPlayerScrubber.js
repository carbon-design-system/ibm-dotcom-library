/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';

import { DDS_FLAGS_ALL } from '../../internal/FeatureFlags';
// const { stablePrefix } = ddsSettings;

import Forward1032 from '@carbon/icons-react/es/forward--10/32';

import { KalturaPlayer as KalturaPlayerAPI } from '@carbon/ibmdotcom-services/es/services';

import PropTypes from 'prop-types';
import React from 'react';

import Rewind_1032 from '@carbon/icons-react/es/rewind--10/32';

import settings from 'carbon-components/es/globals/js/settings';

import Slider from '../../internal/vendor/carbon-components-react/components/Slider/Slider';

const { prefix } = settings;

const AudioPlayerScrubber = ({
  kalturaDigitalPlayer,
  audioTime,
  audioData,
  setAudioTime,
}) => {
  const audioDuration = KalturaPlayerAPI.getMediaDuration(audioData.duration); // Video Total Time

  const handleFormat = (minMax, minOrMaxLabel) => {
    return minOrMaxLabel;
  };

  const handleRewindForwardAudio = addedValue => {
    if (kalturaDigitalPlayer) {
      let time = audioTime + addedValue;
      time = time < 0 ? 0 : time;
      time = time >= audioData.duration ? audioData.duration : time;

      kalturaDigitalPlayer.sendNotification('doSeek', time);
      setAudioTime(time);
    }
  };

  const handleScrubberChange = time => {
    // As this will trigger every time the updatePlayhead listener triggers
    // and we floor the floating value returned, sometimes it will return like
    // 1.123 -> Floored to 1
    // then next function callback will return
    // 1.98123 -> Floored to 1
    // And this function will trigger and set the second on the player to 1
    // meaning it's going back in the audio time and thus generating
    // a really SAD choke/gulp in the audio
    // So this function should ONLY trigger if the absolute difference
    // of the new scrubber time is bigger then 1 from the previou time value
    if (Math.abs(time - audioTime) >= 1 && kalturaDigitalPlayer) {
      kalturaDigitalPlayer.sendNotification('doSeek', time);
      setAudioTime(time);
    }
  };

  return (
    <>
      <Button
        renderIcon={Rewind_1032}
        iconDescription="Rewind 10 seconds"
        hasIconOnly
        kind="ghost"
        tooltipPosition="top"
        onClick={() => {
          handleRewindForwardAudio(-10);
        }}
        disabled={!kalturaDigitalPlayer}
      />

      <div className={`${prefix}--audio-player__audio-time`}>
        <Slider
          min={0}
          max={160}
          minLabel={KalturaPlayerAPI.getMediaDuration(audioTime)}
          maxLabel={audioDuration}
          value={audioTime}
          onChange={({ value }) => handleScrubberChange(value)}
          hideTextInput
          formatLabel={(value, minOrMaxLabel) =>
            handleFormat(value, minOrMaxLabel)
          }
          step={1}
          stepMultiplier={10}
          disabled={!kalturaDigitalPlayer}
        />
      </div>

      <Button
        renderIcon={Forward1032}
        iconDescription="Forward 10 seconds"
        hasIconOnly
        kind="ghost"
        tooltipPosition="top"
        onClick={() => {
          handleRewindForwardAudio(10);
        }}
        disabled={!kalturaDigitalPlayer}
      />
    </>
  );
};

AudioPlayerScrubber.propTypes = {
  /**
   * The kaltura digital player (KDP) object
   */
  kalturaDigitalPlayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  /**
   * The current time of the audio
   */
  audioTime: PropTypes.number.isRequired,
  /**
   * The state setter for the current audio time
   */
  setAudioTime: PropTypes.func.isRequired,
  /**
   * The already processed data from the audio
   */
  audioData: PropTypes.object.isRequired,
};

AudioPlayerScrubber.defaultProps = {
  kalturaDigitalPlayer: false,
};

export default !DDS_FLAGS_ALL ? undefined : AudioPlayerScrubber;
