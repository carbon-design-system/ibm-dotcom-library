/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';

const defaultCardGroupItem = html`
  <dds-card-group-item href="https://example.com">
    <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
    </p>
    <dds-card-cta-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-cta-footer>
  </dds-card-group-item>
`;

export const Default = ({ parameters }) => {
  const { heading, cards } = parameters?.props?.CardSectionSimple ?? {};
  return html`
    <dds-card-section-simple>
      <dds-content-section-heading>${ifNonNull(heading)}</dds-content-section-heading>
      <dds-card-group>${cards}</dds-card-group>
    </dds-card-section-simple>
  `;
};

export const WithCTA = ({ parameters }) => {
  const { heading, cards } = parameters?.props?.CardSectionSimple ?? {};
  return html`
    <dds-card-section-simple>
      <dds-content-section-heading>${ifNonNull(heading)}</dds-content-section-heading>
      <dds-card-group>
        ${cards}
        <dds-card-group-item href="https://example.com" color-scheme="inverse">
          <dds-card-heading>Top level card link</dds-card-heading>
          <dds-card-cta-footer slot="footer" color-scheme="inverse">
            ${ArrowRight20({ slot: 'icon' })}
          </dds-card-cta-footer>
        </dds-card-group-item>
      </dds-card-group>
    </dds-card-section-simple>
  `;
};

export default {
  title: 'Components/Card section simple',
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
      CardSectionSimple: ({ groupId }) => ({
        heading: textNullable('Heading (required)', 'Aliquam condimentum interdum', groupId),
        cards: Array.from({
          length: 5,
        }).map(() => defaultCardGroupItem),
      }),
    },
  },
};
