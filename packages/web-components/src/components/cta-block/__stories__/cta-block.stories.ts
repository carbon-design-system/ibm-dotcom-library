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
import '../cta-block';
import '../cta-block-item-row';
import '../cta-block-item';
import '../../content-item/content-item-copy';
import '../../content-item/content-item-heading';
import '../../content-block/content-block-heading';
import '../../content-block/content-block-copy';

import style from './cta-block-stories.scss';

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
  const { heading, copy, renderIcon } = parameters?.props?.CTABlock ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-block no-border>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-content-block-copy>${copy}</dds-content-block-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>
    </dds-cta-block>
  `;
};

export const WithContentItems = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTABlock ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-block no-border>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-content-block-copy>${ifNonNull(copy)}</dds-content-block-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>

      <dds-cta-block-item-row>
        <dds-cta-block-item>
          <dds-content-item-heading>Get connected</dds-content-item-heading>
          <dds-content-item-copy
            >IBM DevOps partners have a wide range of expertise. Find one to build that right solution for
            you.</dds-content-item-copy
          >
          <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
        </dds-cta-block-item>

        <dds-cta-block-item>
          <dds-content-item-heading>Learn how</dds-content-item-heading>
          <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
          <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
        </dds-cta-block-item>

        <dds-cta-block-item>
          <dds-content-item-heading>Learn how</dds-content-item-heading>
          <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
          <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
        </dds-cta-block-item>
      </dds-cta-block-item-row>
    </dds-cta-block>
  `;
};

export const WithLinkList = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTABlock ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-block>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-content-block-copy>${ifNonNull(copy)}</dds-content-block-copy>

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
    </dds-cta-block>
  `;
};

export default {
  title: 'Components/CTA Block',
  decorators: [
    story => html`
      <style>
        ${style}
      </style>
      <div class="dds-ce-demo-devenv--simple-grid">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      CTABlock: ({ groupId }) => ({
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
