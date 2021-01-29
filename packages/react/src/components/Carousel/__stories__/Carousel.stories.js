/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|Carousel',

  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
    proxy: true,
  },
};

export const Default = () => {
  return (
    <p>
      This component is maintined in{' '}
      <code>@carbon/ibmdotcom-web-components</code> library with a{' '}
      <a
        className="bx--link"
        target="_blank"
        href="https://ibmdotcom-web-components-react.mybluemix.net/?path=/story/components-carousel--default">
        React wrapper
      </a>
      .
    </p>
  );
};
