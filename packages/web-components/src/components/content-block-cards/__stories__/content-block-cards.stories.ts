/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
// eslint-disable-next-line sort-imports
import { CTA_TYPE } from '../../cta/defs';
import imgLg4x3 from '../../../../../storybook-images/assets/720/fpo--4x3--720x540--004.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const cardGroupItem = html`
  <dds-card-group-item cta-type="local" href="https://example.com">
    <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
    </p>
    <dds-card-cta-footer></dds-card-cta-footer>
  </dds-card-group-item>
`;

const cardGroupItemWithImages = html`
  <dds-card-group-item cta-type="local" href="https://example.com">
    <dds-image
      slot="image"
      alt="Image alt text"
      default-src="${imgLg4x3}"
    >
    </dds-image>
    <dds-card-eyebrow>Topic</dds-card-eyebrow>
    <dds-card-heading>Natural Language Processing.</dds-card-heading>
    <dds-card-cta-footer><dds-card-cta-footer>
  </dds-card-group-item>
`;

const cardGroupItemWithVideos = html`
  <dds-card-group-item cta-type="video" href="1_9h94wo6b">
    <dds-card-cta-footer cta-type="video" slot="footer" href="1_9h94wo6b"> </dds-card-cta-footer>
  </dds-card-group-item>
`;

export const Default = ({ parameters }) => {
  const { heading, ctaCopy, ctaType, href } = parameters?.props?.ContentBlockCards ?? {};
  return html`
    <dds-content-block-cards>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-card-group>
        ${cardGroupItem} ${cardGroupItem} ${cardGroupItem} ${cardGroupItem} ${cardGroupItem}
      </dds-card-group>
      <dds-card-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        <p>${ctaCopy}</p>
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-card-cta>
    </dds-content-block-cards>
  `;
};

export const withImages = ({ parameters }) => {
  const { heading, ctaCopy, ctaType, href } = parameters?.props?.ContentBlockCards ?? {};
  return html`
    <dds-content-block-cards>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-card-group>
        ${cardGroupItemWithImages} ${cardGroupItemWithImages} ${cardGroupItemWithImages} ${cardGroupItemWithImages}
        ${cardGroupItemWithImages}
      </dds-card-group>
      <dds-card-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        <p>${ctaCopy}</p>
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-card-cta>
    </dds-content-block-cards>
  `;
};

export const withVideos = ({ parameters }) => {
  const { heading, ctaCopy, ctaType, href } = parameters?.props?.ContentBlockCards ?? {};
  return html`
    <dds-content-block-cards>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-card-group>
        ${cardGroupItemWithVideos} ${cardGroupItemWithVideos} ${cardGroupItemWithVideos} ${cardGroupItemWithVideos}
        ${cardGroupItemWithVideos}
      </dds-card-group>
      <dds-card-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        <p>${ctaCopy}</p>
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-card-cta>
    </dds-content-block-cards>
  `;
};

withVideos.story = {
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export default {
  title: 'Components/Content block cards',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 content-block-story">
            <dds-video-cta-container>
              ${story()}
            </dds-video-cta-container>
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    useRawContainer: true,
    knobs: {
      ContentBlockCards: () => ({
        heading: textNullable('Heading (heading):', 'Aliquam condimentum interdum'),
        ctaCopy: textNullable('Copy text (copy)', 'Lorem ipsum dolor sit ametttt'),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
        href: textNullable('Href (href):', 'https://example.com'),
      }),
    },
  },
};
