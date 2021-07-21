/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentBlockHorizontal from '../ContentBlockHorizontal';
import items from './data/items.json';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Components|Content block horizontal',

  parameters: {
    ...readme.parameters,
    knobs: {
      ContentBlockHorizontal: ({ groupId }) => ({
        heading: text('Heading (heading):', 'Aliquam condimentum', groupId),
        items: items.items,
      }),
    },
    propsSet: {
      default: {
        ContentBlockHorizontal: {
          items: items.items,
        },
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, items } = parameters?.props?.ContentBlockHorizontal ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <ContentBlockHorizontal heading={heading} items={items} />
        </div>
      </div>
    </div>
  );
};
