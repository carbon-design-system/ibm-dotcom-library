/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import '../../card/index';
import '../../card-in-card/index';
import '../index';
import '../../cta/card-cta-footer';
import '../../cta/video-cta-container';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { html } from 'lit-element';
import { select, number, boolean } from '@storybook/addon-knobs';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
// eslint-disable-next-line sort-imports
import imgXlg4x3 from '../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/960/fpo--16x9--960x540--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--005.jpg';
import { GRID_MODE } from '../defs';
import styles from './card-group.stories.scss';

import readme from './README.stories.mdx';

let count = 0;
const phraseArray = [
  'Lorem ipsum dolor sit amet',
  'Nunc convallis lobortis',
  'Lorem ipsum dolor sit amet, consectetur.',
  'Te sint disputando pri, at his aliquip corrumpit',
  'Disputando lorem covallis',
];

const cardsCol = {
  '3 cards per row (Default)': 'dds-ce-demo-devenv--cards-in-row-3',
  '2 cards per row': 'dds-ce-demo-devenv--cards-in-row-2',
  '4 cards per row': 'dds-ce-demo-devenv--cards-in-row-4',
};

const cardsDiffLengthPhrase = (index, border) => {
  const defaultCardGroupItem = html`
    <dds-card-group-item href="https://example.com" color-scheme=${border ? 'light' : null}>
      <dds-card-heading>${index < 5 ? phraseArray[index] : 'Lorem ipsum dolor sit amet'}</dds-card-heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.'
      </p>
      <dds-card-cta-footer slot="footer">
        ${ArrowRight20({ slot: 'icon' })}
      </dds-card-cta-footer>
    </dds-card-group-item>
  `;

  count = count > 3 ? 0 : count + 1;
  return defaultCardGroupItem;
};

const longHeadingCardGroupItem = border => {
  return html`
    <dds-card-group-item href="https://example.com" color-scheme=${border ? 'light' : null}>
      <dds-card-heading>Nunc convallis lobortis Nunc convallis lobortis Nunc convallis lobortis</dds-card-heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <dds-card-cta-footer slot="footer">
        ${ArrowRight20({ slot: 'icon' })}
      </dds-card-cta-footer>
    </dds-card-group-item>
  `;
};

const emptyCard = html`
  <dds-card-group-item empty></dds-card-group-item>
`;

const cardGroupItemWithImages = html`
  <dds-card-group-item href="https://example.com">
    <dds-card-cta-image slot="image" alt="Image alt text" default-src="${imgXlg4x3}"> </dds-card-cta-image>
    <dds-card-eyebrow>Topic</dds-card-eyebrow>
    <dds-card-heading>Natural Language Processing.</dds-card-heading>
    <dds-card-cta-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-cta-footer>
  </dds-card-group-item>
`;

const cardGroupItemWithVideos = html`
  <dds-card-group-item cta-type="video" href="1_9h94wo6b">
    <dds-card-eyebrow>Topic</dds-card-eyebrow>
    <dds-card-cta-footer cta-type="video" slot="footer" href="1_9h94wo6b"> </dds-card-cta-footer>
  </dds-card-group-item>
`;

const cardGroupItemWithCTAs = html`
  <dds-card-group-item href="https://example.com">
    <dds-card-eyebrow>Label</dds-card-eyebrow>
    <dds-card-heading>The United Nations Environment Program works with IBM to reduce marine litter</dds-card-heading>
    <dds-card-cta-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-cta-footer>
  </dds-card-group-item>
`;

export const Default = ({ parameters }) => {
  const { cards, cardsPerRow, offset, optionalBorder } = parameters?.props?.CardGroup ?? {};
  const classes = classMap({
    [cardsPerRow]: cardsPerRow,
  });
  const allCards: object[] = [];
  if (offset === '1') {
    allCards.push(emptyCard);
  }
  allCards.push(longHeadingCardGroupItem(optionalBorder));
  for (let i = 1; i < cards; i++) {
    allCards.push(cardsDiffLengthPhrase(i, optionalBorder));
  }
  const colCount = cardsPerRow[cardsPerRow.length - 1];

  return html`
    <dds-card-group cards-per-row="${colCount}" class="${classes}" grid-mode=${optionalBorder ? 'border' : null}>
      ${allCards}
    </dds-card-group>
  `;
};

export const withCTA = ({ parameters }) => {
  const { cards, cardsPerRow } = parameters?.props?.CardGroup ?? {};
  const classes = classMap({
    [cardsPerRow]: cardsPerRow,
  });
  const colCount = cardsPerRow[cardsPerRow.length - 1];

  return html`
    <dds-card-group cards-per-row="${colCount}" class="${classes}" border>
      ${cards}
      <dds-card-group-item href="https://example.com" color-scheme="inverse">
        <dds-card-heading>Top level card link</dds-card-heading>
        <dds-card-cta-footer slot="footer" color-scheme="inverse">
          ${ArrowRight20({ slot: 'icon' })}
        </dds-card-cta-footer>
      </dds-card-group-item>
    </dds-card-group>
  `;
};

withCTA.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(() => cardGroupItemWithCTAs),
        cardsPerRow: select('Number of cards per row (cards-per-row):', cardsCol, cardsCol['3 cards per row (Default)'], groupId),
      }),
    },
  },
};

export const withImages = ({ parameters }) => {
  const { cards, cardsPerRow } = parameters?.props?.CardGroup ?? {};
  const classes = classMap({
    [cardsPerRow]: cardsPerRow,
  });
  const colCount = cardsPerRow[cardsPerRow.length - 1];

  return html`
    <dds-card-group cards-per-row="${colCount}" class="${classes}">${cards}</dds-card-group>
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
        cardsPerRow: select('Number of cards per row (cards-per-row):', cardsCol, cardsCol['3 cards per row (Default)'], groupId),
      }),
    },
  },
};

export const withCardInCard = ({ parameters }) => {
  const { cards, gridMode } = parameters?.props?.CardGroup ?? {};
  return html`
    <dds-card-in-card href="https://example.com" grid-mode="${ifNonNull(gridMode)}">
      <dds-card-in-card-image slot="image" alt="Image alt text" default-src="${imgSm4x3}">
        <dds-image-item media="(min-width: 1312px)" srcset="${imgXlg16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="${imgMd16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 320px)" srcset="${imgSm4x3}"> </dds-image-item>
      </dds-card-in-card-image>
      <dds-card-eyebrow>Label</dds-card-eyebrow>
      <dds-card-heading>Standard Bank Group prepares to embrace Africa’s AI opportunity</dds-card-heading>
      <dds-card-cta-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </dds-card-cta-footer>
    </dds-card-in-card>
    <dds-card-group grid-mode="${ifNonNull(gridMode)}">
      ${cards}
    </dds-card-group>
  `;
};

const gridModes = {
  [`Collapsed (1px)`]: GRID_MODE.COLLAPSED,
  [`Narrow (16px)`]: GRID_MODE.NARROW,
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

export const withMixedMedia = ({ parameters }) => {
  const { cards, cardsPerRow } = parameters?.props?.CardGroup ?? {};
  const classes = classMap({
    [cardsPerRow]: cardsPerRow,
  });
  const colCount = cardsPerRow[cardsPerRow.length - 1];

  return html`
    <dds-video-cta-container class="${classes}">
      <dds-card-group cards-per-row="${colCount}" class="${classes}">
        ${cards}
      </dds-card-group>
    </dds-video-cta-container>
  `;
};

withMixedMedia.story = {
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map((_, index) => (index % 2 ? cardGroupItemWithImages : cardGroupItemWithVideos)),
        cardsPerRow: select('Number of cards per row (cards-per-row):', cardsCol, cardsCol['3 cards per row (Default)'], groupId),
      }),
    },
  },
};

export const withCardInCardAndImageCards = ({ parameters }) => {
  const { cards, gridMode } = parameters?.props?.CardGroup ?? {};
  return html`
    <dds-card-in-card href="https://example.com" grid-mode="${ifNonNull(gridMode)}">
      <dds-card-in-card-image slot="image" alt="Image alt text" default-src="${imgSm4x3}">
        <dds-image-item media="(min-width: 1312px)" srcset="${imgXlg16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="${imgMd16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 320px)" srcset="${imgSm4x3}"> </dds-image-item>
      </dds-card-in-card-image>
      <dds-card-eyebrow>Label</dds-card-eyebrow>
      <dds-card-heading>Standard Bank Group prepares to embrace Africa’s AI opportunity</dds-card-heading>
      <dds-card-cta-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </dds-card-cta-footer>
    </dds-card-in-card>
    <dds-card-group grid-mode="${ifNonNull(gridMode)}">
      ${cards}
    </dds-card-group>
  `;
};

withCardInCardAndImageCards.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        gridMode: select('Grid mode:', gridModes, GRID_MODE.NARROW, groupId),
        cards: Array.from({
          length: number('Number of cards', 3, {}, groupId),
        }).map(() => cardGroupItemWithImages),
      }),
    },
  },
};

export default {
  title: 'Components/Card group',
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--card-group">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    hasGrid: true,
    ...readme.parameters,
    hasCardGroupStandalone: true,
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: number('Number of cards', 5, {}, groupId),
        optionalBorder: boolean('Outlined cards:', false, groupId),
        cardsPerRow: select('Number of cards per row (cards-per-row):', cardsCol, cardsCol['3 cards per row (Default)'], groupId),
        offset: select('Offset', ['0', '1'], '0', groupId),
      }),
    },
  },
};
