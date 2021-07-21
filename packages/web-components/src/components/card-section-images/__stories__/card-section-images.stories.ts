/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import imgLg4x3 from '../../../../../storybook-images/assets/720/fpo--4x3--720x540--005.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const cardGroupItemWithImages = html`
  <dds-card-group-item href="https://example.com">
    <dds-image slot="image" alt="Image alt text" default-src="${imgLg4x3}"> </dds-image>
    <dds-card-eyebrow>Topic</dds-card-eyebrow>
    <dds-card-heading>Natural Language Processing.</dds-card-heading>
    <dds-card-cta-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-cta-footer>
  </dds-card-group-item>
`;

export const Default = ({ parameters }) => {
  const { heading, cards } = parameters?.props?.CardSectionImages ?? {};
  return html`
    <dds-card-section-images>
      <dds-content-section-heading>${ifNonNull(heading)}</dds-content-section-heading>
      <dds-card-group>${cards}</dds-card-group>
    </dds-card-section-images>
  `;
};

export default {
  title: 'Components/Card section images',
  decorators: [
    story => html`
      <div class="bx--grid bx--content-group-story dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      CardSectionImages: ({ groupId }) => ({
        heading: textNullable('Heading (required)', 'Aliquam condimentum interdum', groupId),
        cards: Array.from({
          length: 5,
        }).map(() => cardGroupItemWithImages),
      }),
    },
  },
};
