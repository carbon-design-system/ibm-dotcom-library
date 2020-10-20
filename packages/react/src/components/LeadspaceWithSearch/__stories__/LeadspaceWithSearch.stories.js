/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LeadspaceWithSearch from '../LeadspaceWithSearch';
import React from 'react';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Components|LeadspaceWithSearch',
  parameters: {
    knobs: {
      LeadspaceWithSearch: ({ groupId }) => ({
        heading: text('Heading (heading):', 'Find a product', groupId),
        copy: text(
          'Copy (copy):',
          'Duis aute irure dolor in reprehen deritirure',
          groupId
        ),
        searchProps: {
          placeHolderText: text(
            'Placeholder (searchProps.placeHolderText):',
            'Search keywords',
            groupId
          ),
        },
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, copy, searchProps, buttonsProps } =
    parameters?.props?.LeadspaceWithSearch ?? {};

  return (
    <LeadspaceWithSearch
      heading={heading}
      copy={copy}
      searchProps={searchProps}
      buttonsProps={buttonsProps}
    />
  );
};
