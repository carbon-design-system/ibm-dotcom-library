/**
 * @license
 *
 * Copyright IBM Corp. 2020
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
import '../cta-section';
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
  return html`
    <dds-cta-section .copy="${ifNonNull(copy)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>

      <dds-button-group slot="cta">
        <dds-button-group-item href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>
    </dds-cta-section>
  `;
};

export const WithContentItems = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};
  return html`
    <dds-cta-section .copy="${ifNonNull(copy)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>

      <dds-button-group slot="cta">
        <dds-button-group-item href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>

      <dds-cta-section-item>
        <dds-cta-section-item-heading>Get connected</dds-cta-section-item-heading>
        <dds-cta-section-item-copy
          content="IBM DevOps partners have a wide range of expertise. Find one to build the right solution for you."
        ></dds-cta-section-item-copy>
        <dds-text-cta slot="cta" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
      </dds-cta-section-item>

      <dds-cta-section-item>
        <dds-cta-section-item-heading>Learn how</dds-cta-section-item-heading>
        <dds-cta-section-item-copy content="IBM DevOps partners have a wide range of expertise"></dds-cta-section-item-copy>
        <dds-text-cta slot="cta" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
      </dds-cta-section-item>
    </dds-cta-section>
  `;
};

export const WithLinkList = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};
  return html`
    <dds-cta-section .copy="${ifNonNull(copy)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>

      <dds-button-group slot="cta">
        <dds-button-group-item href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>

      <dds-link-list type="end">
        <span slot="heading">Tutorial</span>
        <dds-link-list-item href="https://example.com">
          Learn more ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Microservices and containers ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
      </dds-link-list>

      <dds-link-list type="end">
        <span slot="heading"></span>
        <dds-link-list-item href="https://example.com">
          Learn more ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Microservices and containers ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
      </dds-link-list>
    </dds-cta-section>
  `;
};

export const TEST = () => {
  // const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};
  return html`
    <div class="bx--helper-wrapper">
      <div class="bx--content-item-wrapper">
        <dds-link-list class="test" type="end">
          <span slot="heading">Tutorial</span>
          <dds-link-list-item href="https://example.com">
            Learn more ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
          <dds-link-list-item href="https://example.com">
            Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
          <dds-link-list-item href="https://example.com">
            Microservices and containers ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
        </dds-link-list>

        <dds-link-list class="test" type="end">
          <span slot="heading"></span>
          <dds-link-list-item href="https://example.com">
            Learn more ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
          <dds-link-list-item href="https://example.com">
            Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
          <dds-link-list-item href="https://example.com">
            Microservices and containers ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
        </dds-link-list>
      </div>
    </div>
  `;
};

export default {
  title: 'Components/CTA Section',
  decorators: [
    story => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--col-lg-12 bx--offset-lg-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    hasGrid: true,
    gridLargeColumnClass: 'bx--col-lg-8',
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
