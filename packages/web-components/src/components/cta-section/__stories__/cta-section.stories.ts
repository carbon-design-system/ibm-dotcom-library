/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import Launch20 from 'carbon-web-components/es/icons/launch/20';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../button-group/button-group-item';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import '../../link-list/link-list-item';
import '../cta-section';
import '../cta-section-copy';
import '../cta-section-item';
import '../cta-section-item-heading';
import '../cta-section-item-copy';

const iconMap = {
  ArrowRight20: ArrowRight20({ slot: 'icon' }),
  Launch20: Launch20({ slot: 'icon' }),
};

const iconOptions = {
  Default: null,
  'Arrow Right': 'ArrowRight20',
  'External Launch': 'Launch20',
};

export const Default = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-section>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-cta-section-copy>${copy}</dds-cta-section-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>
    </dds-cta-section>
  `;
};

export const WithContentItems = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-section>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-cta-section-copy>${ifNonNull(copy)}</dds-cta-section-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>

      <dds-cta-section-item>
        <dds-cta-section-item-heading>Get connected</dds-cta-section-item-heading>
        <dds-cta-section-item-copy
          >IBM DevOps partners have a wide range of expertise. Find one to build the right solution for
          you.</dds-cta-section-item-copy
        >
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
      </dds-cta-section-item>

      <dds-cta-section-item>
        <dds-cta-section-item-heading>Learn how</dds-cta-section-item-heading>
        <dds-cta-section-item-copy>IBM DevOps partners have a wide range of expertise</dds-cta-section-item-copy>
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
      </dds-cta-section-item>
    </dds-cta-section>
  `;
};

export const WithStatisticContentItems = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-section>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-cta-section-copy>${ifNonNull(copy)}</dds-cta-section-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>

      <dds-cta-section-item>
        <dds-cta-section-item-heading>Get connected</dds-cta-section-item-heading>
        <svg
                slot="pictogram"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                data-autoid="dds--pictogram-item__pictogram"
                aria-label="Pictogram description"
                viewBox="0 0 32 32"
                role="img"
                class="bx--promo-item__pictogram"
              >
                <path
                  d="M13.5 7.36H7v-.72h6.5v.72zm0 8.28H7v.72h6.5v-.72zM7 
              25.36h6.5v-.72H7v.72zM30.36 7v9a.36.36 0 01-.36.36h-3.64V19a.36.36 
              0 01-.36.36H6a.36.36 0 01-.36-.36v-2.64H2.36v8.28h3.28V22a.36.36 
              0 01.36-.36h20a.36.36 0 01.36.36v6a.36.36 0 01-.36.36H6a.36.36 
              0 01-.36-.36v-2.64H2a.36.36 0 01-.36-.36v-9a.36.36 
              0 01.36-.36h3.64V13a.36.36 0 01.36-.36h20a.36.36 
              0 01.36.36v2.64h3.279V7.36H26.36V10a.36.36 
              0 01-.36.36H6a.36.36 0 01-.36-.36V4A.36.36 
              0 016 3.64h20a.36.36 0 01.36.36v2.64H30a.36.36 
              0 01.36.36zm-4.72-2.64H6.36v5.28h19.28V4.36zM6.36 
              27.64h19.28v-5.28H6.36v5.28zm19.28-14.28H6.36v5.28h19.28v-5.28zM24 
              7a.5.5 0 10-1 0 .5.5 0 001 0zm0 9a.5.5 
              0 10-1 0 .5.5 0 001 0zm0 9a.5.5 0 10-1 0 .5.5 0 001 0z"
                />
                <path fill="none" d="M0 0h32v32H0z" />
              </svg>
        <dds-cta-section-item-copy
          >IBM DevOps partners have a wide range of expertise. Find one to build the right solution for
          you.</dds-cta-section-item-copy
        >
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
      </dds-cta-section-item>

      <dds-cta-section-item>
        <dds-cta-section-item-heading>Learn how</dds-cta-section-item-heading>
        <svg
                slot="pictogram"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                data-autoid="dds--pictogram-item__pictogram"
                aria-label="Pictogram description"
                viewBox="0 0 32 32"
                role="img"
                class="bx--promo-item__pictogram"
              >
                <path
                  d="M13.5 7.36H7v-.72h6.5v.72zm0 8.28H7v.72h6.5v-.72zM7 
              25.36h6.5v-.72H7v.72zM30.36 7v9a.36.36 0 01-.36.36h-3.64V19a.36.36 
              0 01-.36.36H6a.36.36 0 01-.36-.36v-2.64H2.36v8.28h3.28V22a.36.36 
              0 01.36-.36h20a.36.36 0 01.36.36v6a.36.36 0 01-.36.36H6a.36.36 
              0 01-.36-.36v-2.64H2a.36.36 0 01-.36-.36v-9a.36.36 
              0 01.36-.36h3.64V13a.36.36 0 01.36-.36h20a.36.36 
              0 01.36.36v2.64h3.279V7.36H26.36V10a.36.36 
              0 01-.36.36H6a.36.36 0 01-.36-.36V4A.36.36 
              0 016 3.64h20a.36.36 0 01.36.36v2.64H30a.36.36 
              0 01.36.36zm-4.72-2.64H6.36v5.28h19.28V4.36zM6.36 
              27.64h19.28v-5.28H6.36v5.28zm19.28-14.28H6.36v5.28h19.28v-5.28zM24 
              7a.5.5 0 10-1 0 .5.5 0 001 0zm0 9a.5.5 
              0 10-1 0 .5.5 0 001 0zm0 9a.5.5 0 10-1 0 .5.5 0 001 0z"
                />
                <path fill="none" d="M0 0h32v32H0z" />
              </svg>
        <dds-cta-section-item-copy>IBM DevOps partners have a wide range of expertise</dds-cta-section-item-copy>
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
      </dds-cta-section-item>
    </dds-cta-section>
  `;
};

export const WithPictogramContentItems = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-section>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-cta-section-copy>${ifNonNull(copy)}</dds-cta-section-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>

      <dds-cta-section-item>
        <dds-cta-section-item-heading>Get connected</dds-cta-section-item-heading>
        <svg
                slot="pictogram"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                data-autoid="dds--pictogram-item__pictogram"
                aria-label="Pictogram description"
                viewBox="0 0 32 32"
                role="img"
                class="bx--promo-item__pictogram"
              >
                <path
                  d="M13.5 7.36H7v-.72h6.5v.72zm0 8.28H7v.72h6.5v-.72zM7 
              25.36h6.5v-.72H7v.72zM30.36 7v9a.36.36 0 01-.36.36h-3.64V19a.36.36 
              0 01-.36.36H6a.36.36 0 01-.36-.36v-2.64H2.36v8.28h3.28V22a.36.36 
              0 01.36-.36h20a.36.36 0 01.36.36v6a.36.36 0 01-.36.36H6a.36.36 
              0 01-.36-.36v-2.64H2a.36.36 0 01-.36-.36v-9a.36.36 
              0 01.36-.36h3.64V13a.36.36 0 01.36-.36h20a.36.36 
              0 01.36.36v2.64h3.279V7.36H26.36V10a.36.36 
              0 01-.36.36H6a.36.36 0 01-.36-.36V4A.36.36 
              0 016 3.64h20a.36.36 0 01.36.36v2.64H30a.36.36 
              0 01.36.36zm-4.72-2.64H6.36v5.28h19.28V4.36zM6.36 
              27.64h19.28v-5.28H6.36v5.28zm19.28-14.28H6.36v5.28h19.28v-5.28zM24 
              7a.5.5 0 10-1 0 .5.5 0 001 0zm0 9a.5.5 
              0 10-1 0 .5.5 0 001 0zm0 9a.5.5 0 10-1 0 .5.5 0 001 0z"
                />
                <path fill="none" d="M0 0h32v32H0z" />
              </svg>
        <dds-cta-section-item-copy
          >IBM DevOps partners have a wide range of expertise. Find one to build the right solution for
          you.</dds-cta-section-item-copy
        >
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
      </dds-cta-section-item>

      <dds-cta-section-item>
        <dds-cta-section-item-heading>Learn how</dds-cta-section-item-heading>
        <svg
                slot="pictogram"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                data-autoid="dds--pictogram-item__pictogram"
                aria-label="Pictogram description"
                viewBox="0 0 32 32"
                role="img"
                class="bx--promo-item__pictogram"
              >
                <path
                  d="M13.5 7.36H7v-.72h6.5v.72zm0 8.28H7v.72h6.5v-.72zM7 
              25.36h6.5v-.72H7v.72zM30.36 7v9a.36.36 0 01-.36.36h-3.64V19a.36.36 
              0 01-.36.36H6a.36.36 0 01-.36-.36v-2.64H2.36v8.28h3.28V22a.36.36 
              0 01.36-.36h20a.36.36 0 01.36.36v6a.36.36 0 01-.36.36H6a.36.36 
              0 01-.36-.36v-2.64H2a.36.36 0 01-.36-.36v-9a.36.36 
              0 01.36-.36h3.64V13a.36.36 0 01.36-.36h20a.36.36 
              0 01.36.36v2.64h3.279V7.36H26.36V10a.36.36 
              0 01-.36.36H6a.36.36 0 01-.36-.36V4A.36.36 
              0 016 3.64h20a.36.36 0 01.36.36v2.64H30a.36.36 
              0 01.36.36zm-4.72-2.64H6.36v5.28h19.28V4.36zM6.36 
              27.64h19.28v-5.28H6.36v5.28zm19.28-14.28H6.36v5.28h19.28v-5.28zM24 
              7a.5.5 0 10-1 0 .5.5 0 001 0zm0 9a.5.5 
              0 10-1 0 .5.5 0 001 0zm0 9a.5.5 0 10-1 0 .5.5 0 001 0z"
                />
                <path fill="none" d="M0 0h32v32H0z" />
              </svg>
        <dds-cta-section-item-copy>IBM DevOps partners have a wide range of expertise</dds-cta-section-item-copy>
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
      </dds-cta-section-item>
    </dds-cta-section>
  `;
};

export const WithImageContentItems = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-section>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-cta-section-copy>${ifNonNull(copy)}</dds-cta-section-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>

      <dds-cta-section-item>
        <dds-cta-section-item-heading>Get connected</dds-cta-section-item-heading>
        <svg
                slot="pictogram"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                data-autoid="dds--pictogram-item__pictogram"
                aria-label="Pictogram description"
                viewBox="0 0 32 32"
                role="img"
                class="bx--promo-item__pictogram"
              >
                <path
                  d="M13.5 7.36H7v-.72h6.5v.72zm0 8.28H7v.72h6.5v-.72zM7 
              25.36h6.5v-.72H7v.72zM30.36 7v9a.36.36 0 01-.36.36h-3.64V19a.36.36 
              0 01-.36.36H6a.36.36 0 01-.36-.36v-2.64H2.36v8.28h3.28V22a.36.36 
              0 01.36-.36h20a.36.36 0 01.36.36v6a.36.36 0 01-.36.36H6a.36.36 
              0 01-.36-.36v-2.64H2a.36.36 0 01-.36-.36v-9a.36.36 
              0 01.36-.36h3.64V13a.36.36 0 01.36-.36h20a.36.36 
              0 01.36.36v2.64h3.279V7.36H26.36V10a.36.36 
              0 01-.36.36H6a.36.36 0 01-.36-.36V4A.36.36 
              0 016 3.64h20a.36.36 0 01.36.36v2.64H30a.36.36 
              0 01.36.36zm-4.72-2.64H6.36v5.28h19.28V4.36zM6.36 
              27.64h19.28v-5.28H6.36v5.28zm19.28-14.28H6.36v5.28h19.28v-5.28zM24 
              7a.5.5 0 10-1 0 .5.5 0 001 0zm0 9a.5.5 
              0 10-1 0 .5.5 0 001 0zm0 9a.5.5 0 10-1 0 .5.5 0 001 0z"
                />
                <path fill="none" d="M0 0h32v32H0z" />
              </svg>
        <dds-cta-section-item-copy
          >IBM DevOps partners have a wide range of expertise. Find one to build the right solution for
          you.</dds-cta-section-item-copy
        >
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
      </dds-cta-section-item>

      <dds-cta-section-item>
        <dds-cta-section-item-heading>Learn how</dds-cta-section-item-heading>
        <svg
                slot="pictogram"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                data-autoid="dds--pictogram-item__pictogram"
                aria-label="Pictogram description"
                viewBox="0 0 32 32"
                role="img"
                class="bx--promo-item__pictogram"
              >
                <path
                  d="M13.5 7.36H7v-.72h6.5v.72zm0 8.28H7v.72h6.5v-.72zM7 
              25.36h6.5v-.72H7v.72zM30.36 7v9a.36.36 0 01-.36.36h-3.64V19a.36.36 
              0 01-.36.36H6a.36.36 0 01-.36-.36v-2.64H2.36v8.28h3.28V22a.36.36 
              0 01.36-.36h20a.36.36 0 01.36.36v6a.36.36 0 01-.36.36H6a.36.36 
              0 01-.36-.36v-2.64H2a.36.36 0 01-.36-.36v-9a.36.36 
              0 01.36-.36h3.64V13a.36.36 0 01.36-.36h20a.36.36 
              0 01.36.36v2.64h3.279V7.36H26.36V10a.36.36 
              0 01-.36.36H6a.36.36 0 01-.36-.36V4A.36.36 
              0 016 3.64h20a.36.36 0 01.36.36v2.64H30a.36.36 
              0 01.36.36zm-4.72-2.64H6.36v5.28h19.28V4.36zM6.36 
              27.64h19.28v-5.28H6.36v5.28zm19.28-14.28H6.36v5.28h19.28v-5.28zM24 
              7a.5.5 0 10-1 0 .5.5 0 001 0zm0 9a.5.5 
              0 10-1 0 .5.5 0 001 0zm0 9a.5.5 0 10-1 0 .5.5 0 001 0z"
                />
                <path fill="none" d="M0 0h32v32H0z" />
              </svg>
        <dds-cta-section-item-copy>IBM DevOps partners have a wide range of expertise</dds-cta-section-item-copy>
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
      </dds-cta-section-item>
    </dds-cta-section>
  `;
};

export const WithLinkList = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-section>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-cta-section-copy>${ifNonNull(copy)}</dds-cta-section-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>

      <dds-link-list slot="link-list" type="end">
        <dds-link-list-heading>More ways to explore DevOps</dds-link-list-heading>
        <dds-link-list-item href="https://example.com">
          Events ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Blogs ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Training ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Developer resources ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Research ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          News ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
      </dds-link-list>
    </dds-cta-section>
  `;
};

export default {
  title: 'Components/CTA Section',
  decorators: [
    (story, { parameters }) => html`
      <div class="dds-ce-demo-devenv--simple-grid ${parameters.gridContentClasses}">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    hasGrid: true,
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid--content-layout',
    hasVerticalSpacingInComponent: true,
    knobs: {
      CTASection: ({ groupId }) => ({
        heading: textNullable('Heading (required)', 'Take the next step', groupId),
        copy: textNullable(
          'Copy text (copy)',
          'Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.',
          groupId
        ),
        renderIcon: iconMap[select(`Icon`, iconOptions, iconOptions.Default, groupId) ?? 0],
      }),
    },
    ...readme.parameters,
  },
};
