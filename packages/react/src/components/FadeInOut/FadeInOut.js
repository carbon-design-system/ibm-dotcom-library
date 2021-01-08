/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect, useRef } from 'react';
import { breakpoints } from '@carbon/layout';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
const { prefix } = settings;

/**
 * Utility handles fade transition for selected elements.
 *
 * @example
 * import { FadeInOut } from '@carbon/ibmdotcom-react';
 * import '@carbon/ibmdotcom-styles/scss/internal/scroll-into-view/_scroll-into-view.scss';
 *
 * As an example, the function can be called to target all instances of the
 * elements in a list:
 *
 * const list = '.bx--content-block, .bx--content-group';
 *
 * For default values of 400ms and 'one and done' play:
 * <FadeInOut selectorTargets={selectorTargets} />
 *
 * With 'continuous play' option:
 * <FadeInOut selectorTargets={selectorTargets} keepAnimations={true} />
 *
 * For custom delay time, set within targeted class in the application's CSS code as such:
 *
 * .bx--content-block {
 *   --#{$dds-prefix}--fade-in-out-delay: 250ms;
 * }
 *
 */
const FadeInOut = ({ selectorTargets, keepAnimations }) => {
  /**
   * Amount of columns used for calculation.
   *
   * @private
   */
  const _colSpan = 3;

  /**
   * The inner viewport calculation for the root margins.
   *
   * @private
   */
  function _getViewportMargin() {
    return (
      '-' +
      (
        (document.documentElement.clientHeight * _colSpan) /
        breakpoints.max.columns
      ).toString() +
      'px 0px'
    );
  }

  /**
   * Saved list of elements to observe to avoid calling querySelectorAll
   * more than once.
   *
   * @private
   */
  const _elements = [];

  /**
   * Intersection Observer options
   *
   * @private
   */
  const _options = {
    rootMargin: '0px',
    threshold: 0,
  };

  /**
   * Intersection Observer that watches outer viewport.
   *
   * @private
   */
  const _rootObserver = useRef(null);

  /**
   * Intersection observer that watches the inner viewport.
   *
   * @private
   */
  const _innerObserver = useRef(null);

  /**
   * Resize observer to trigger rootMargin recalculations
   *
   * @private
   */
  const _resizeObserver = useRef(null);

  /**
   * Create observers upon render and update.
   */
  useEffect(() => {
    _rootObserver.current = new IntersectionObserver(handleExit);
    _resizeObserver.current = new ResizeObserver(handleResize);

    if (selectorTargets) {
      document.querySelectorAll(selectorTargets).forEach(item => {
        _rootObserver?.current.observe(item);
        _elements.push(item);
      });
    }
    _resizeObserver.current.observe(document.documentElement);

    return () => {
      _rootObserver.current.disconnect();
      _innerObserver.current.disconnect();
      _resizeObserver.current.disconnect();
      _rootObserver.current = null;
      _innerObserver.current = null;
      _resizeObserver.current = null;
    };
  }, [selectorTargets, _elements, _options, handleEntrance, handleResize]);

  /**
   * Handler to add recalculated rootMargin to a new instance of
   * inner observer after clearing old one first.
   *
   * @private
   *
   */
  const handleResize = useCallback(() => {
    _options.rootMargin = _getViewportMargin();

    if (_innerObserver.current) {
      _innerObserver.current.disconnect();
      _innerObserver.current = null;
    }

    _innerObserver.current = new IntersectionObserver(handleEntrance, _options);
    _elements.forEach(item => {
      _innerObserver?.current.observe(item);
    });
  }, [_options, _elements, _innerObserver, handleEntrance]);

  /**
   * Handler to add fade animation to element
   *
   * @param {*} records observed elements
   * @private
   *
   */
  const handleEntrance = useCallback(
    records => {
      records.forEach(({ intersectionRatio, target }) => {
        if (intersectionRatio > 0) {
          target.classList.remove(`${prefix}--fade-out`);
          target.classList.add(`${prefix}--fade-in`);
          if (!keepAnimations) {
            _rootObserver.current.unobserve(target);
            _innerObserver.current.unobserve(target);
          }
        }
      });
    },
    [keepAnimations, _rootObserver, _innerObserver]
  );

  /**
   * Handler to remove element from view
   *
   * @param {*} records observed elements
   * @private
   *
   */
  function handleExit(records) {
    records.forEach(({ intersectionRatio, target }) => {
      if (intersectionRatio == 0) {
        target.classList.remove(`${prefix}--fade-in`);
        target.classList.add(`${prefix}--fade-out`);
      }
    });
  }
  return null;
};

FadeInOut.propTypes = {
  /**
   * List of elements to be targeted
   */
  selectorTargets: PropTypes.string,

  /**
   * Boolean to define if animation is continuous
   */
  keepAnimations: PropTypes.bool,
};

export default FadeInOut;
