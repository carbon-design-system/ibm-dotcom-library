/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../card/card-eyebrow';
import '../../card/card-heading';
import '../../card-in-card/card-in-card';
import '../../card-in-card/card-in-card-footer';
import '../../card-in-card/card-in-card-image';
import '../card-group';
import '../card-group-item';
import '../../cta/video-cta-container';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { html } from 'lit-element';
import { select, number } from '@storybook/addon-knobs';
// eslint-disable-next-line sort-imports
import imgXlg4x3 from '../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/960/fpo--16x9--960x540--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--005.jpg';
import { GRID_MODE } from '../defs';

import readme from './README.stories.mdx';

const defaultCardGroupItem = html`
  <dds-card-group-item href="https://example.com">
    <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
    </p>
    <dds-card-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-card-group-item>
`;

const longHeadingCardGroupItem = html`
  <dds-card-group-item href="https://example.com">
    <dds-card-heading>Nunc convallis lobortis Nunc convallis lobortis Nunc convallis lobortis</dds-card-heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
    </p>
    <dds-card-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-card-group-item>
`;

const cardGroupItemWithImages = html`
  <dds-card-group-item href="https://example.com">
    <dds-card-cta-image slot="image" alt="Image alt text" default-src="${imgXlg4x3}"> </dds-card-cta-image>
    <dds-card-eyebrow>Topic</dds-card-eyebrow>
    <dds-card-heading>Natural Language Processing.</dds-card-heading>
    <dds-card-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-card-group-item>
`;

const cardGroupItemWithVideos = html`
  <dds-card-group-item cta-type="video" href="1_9h94wo6b">
    <dds-card-cta-footer cta-type="video" slot="footer" href="1_9h94wo6b"> </dds-card-cta-footer>
  </dds-card-group-item>
`;

const cardGroupItemWithCTAs = html`
  <dds-card-group-item href="https://example.com">
    <dds-card-eyebrow>Label</dds-card-eyebrow>
    <dds-card-heading>The United Nations Environment Program works with IBM to reduce marine litter</dds-card-heading>
    <dds-card-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-card-group-item>
`;

export const Default = ({ parameters }) => {
  const { cards } = parameters?.props?.CardGroup ?? {};
  return html`
    <dds-card-group>${longHeadingCardGroupItem} ${cards}</dds-card-group>
  `;
};

export const withCTA = ({ parameters }) => {
  const { cards } = parameters?.props?.CardGroup ?? {};
  return html`
    <dds-card-group>
      ${cards}
      <dds-card-group-item href="https://example.com" color-scheme="inverse">
        <dds-card-heading>Top level card link</dds-card-heading>
        <dds-card-footer slot="footer" color-scheme="inverse">
          ${ArrowRight20({ slot: 'icon' })}
        </dds-card-footer>
      </dds-card-group-item>
    </dds-card-group>
  `;
};

export const withImages = ({ parameters }) => {
  const { cards } = parameters?.props?.CardGroup ?? {};
  return html`
    <dds-card-group>${cards}</dds-card-group>
  `;
};

withImages.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(() => cardGroupItemWithImages),
      }),
    },
  },
};

export const withImagesAndCTA = ({ parameters }) => {
  const { cards } = parameters?.props?.CardGroup ?? {};
  return html`
    <dds-card-group>
      ${cards}
      <dds-card-group-item href="https://example.com" color-scheme="inverse">
        <dds-card-heading>Top level card link</dds-card-heading>
        <dds-card-footer slot="footer" color-scheme="inverse">
          ${ArrowRight20({ slot: 'icon' })}
        </dds-card-footer>
      </dds-card-group-item>
    </dds-card-group>
  `;
};

withImagesAndCTA.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(() => cardGroupItemWithImages),
      }),
    },
  },
};

export const withMixedMedia = ({ parameters }) => {
  const { cards } = parameters?.props?.CardGroup ?? {};
  return html`
    <dds-video-cta-container>
      <dds-card-group>
        ${cards}
      </dds-card-group>
    </dds-video-cta-container>
  `;
};

withMixedMedia.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map((_, index) => (index % 2 ? cardGroupItemWithImages : cardGroupItemWithVideos)),
      }),
    },
  },
};

const gridModes = {
  [`Collapsed (1px)`]: GRID_MODE.COLLAPSED,
  [`Narrow (16px)`]: GRID_MODE.NARROW,
};

export const withCardInCard = ({ parameters }) => {
  const { cards, gridMode } = parameters?.props?.CardGroup ?? {};
  return html`
    <dds-card-in-card grid-mode="${gridMode}" href="https://example.com">
      <dds-card-in-card-image slot="image" alt="Image alt text" default-src="${imgSm4x3}">
        <dds-image-item media="(min-width: 1312px)" srcset="${imgXlg16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="${imgMd16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 320px)" srcset="${imgSm4x3}"> </dds-image-item>
      </dds-card-in-card-image>
      <dds-card-eyebrow>Label</dds-card-eyebrow>
      <dds-card-heading>Standard Bank Group prepares to embrace Africa’s AI opportunity</dds-card-heading>
      <dds-card-in-card-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </dds-card-in-card-footer>
    </dds-card-in-card>
    <dds-card-group grid-mode="${gridMode}">
      ${cards}
    </dds-card-group>
  `;
};

withCardInCard.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        gridMode: select('Grid mode:', gridModes, GRID_MODE.NARROW, groupId),
        cards: Array.from({
          length: number('Number of cards', 3, {}, groupId),
        }).map(() => cardGroupItemWithCTAs),
      }),
    },
  },
};

export default {
  title: 'Components/Card Group',
  parameters: {
    hasGrid: true,
    ...readme.parameters,
    hasCardGroupStandalone: true,
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 4, {}, groupId),
        }).map(() => defaultCardGroupItem),
      }),
    },
    decorators: [
      story => html`
        <div class="dds-ce-demo-devenv--grid--stretch">
          ${story()}
        </div>
      `,
    ],
  },
};
