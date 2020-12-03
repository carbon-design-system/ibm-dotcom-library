/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibmdotcom-styles/scss/internal/scroll-into-view/_scroll-into-view.scss';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';

const { stablePrefix } = ddsSettings;

/**
 * Utility handles fade transition for selected elements.
 *
 * @example
 * import { scrollIntoView } from '@carbon/ibmdotcom-utilities';
 *
 * As an example, the function can be called to target 'bx--content-block' as such:
 *
 * For default values of 400ms and continuous play:
 * scrollIntoView('.bx--content-block')
 *
 * With custom options:
 * scrollIntoView('.bx--content-block', '3s', false)
 *
 * @param {*} selector menu item selector id
 * @param {string} delay in either seconds or ms for animation to play
 * @param {boolean} iterations to define whether its continuous or not
 */

const viewportMargin =
  '-' +
  (
    Math.round(document.documentElement.clientHeight / (100 / 12.5)) + 32
  ).toString() +
  'px 0px';

const options = {
  rootMargin: viewportMargin,
  threshold: 0,
};

const scrollIntoView = (selector, delay = '400ms', iterations = true) => {
  window.addEventListener(
    'load',
    () => {
      const elements = document.querySelectorAll(selector);
      const root = document.documentElement;

      const observer = new IntersectionObserver(function handleIntersect(
        entries
      ) {
        root.style.setProperty(`--${stablePrefix}--delay`, delay);
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            entry.target.classList.remove('bx--fade-out');
            entry.target.classList.add('bx--fade-in');
            if (!iterations) {
              observer.unobserve(entry.target);
            }
          } else {
            entry.target.classList.remove('bx--fade-in');
            entry.target.classList.add('bx--fade-out');
          }
        });
      },
      options);

      elements.forEach(e => {
        observer.observe(e);
      });
    },
    false
  );
};

export default scrollIntoView;
