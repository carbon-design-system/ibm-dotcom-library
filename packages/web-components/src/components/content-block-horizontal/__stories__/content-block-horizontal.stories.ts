/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';

const copy =
  'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. ' +
  'Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
  'Phasellus at elit sollicitudin.';

const linkListItem = html`
  <dds-content-item-horizontal>
    <dds-content-item-horizontal-eyebrow>Lorem ipsum</dds-content-item-horizontal-eyebrow>
    <dds-content-item-heading>Aliquam condimentum</dds-content-item-heading>
    <dds-content-item-horizontal-copy>${copy}</dds-content-item-horizontal-copy>
    <dds-link-list slot="footer" type="vertical">
      <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="local">
        Link text
      </dds-link-list-item-cta>
      <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="external">
        External link text
      </dds-link-list-item-cta>
    </dds-link-list>
  </dds-content-item-horizontal>
`;

export const Default = ({ parameters }) => {
  const { heading } = parameters?.props?.ContentBlockHorizontal ?? {};
  return html`
    <dds-content-block-horizontal>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      ${linkListItem} ${linkListItem} ${linkListItem}
    </dds-content-block-horizontal>
  `;
};

export default {
  title: 'Components/Content block horizontal',
  decorators: [
    story => html`
      <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-block-horizontal">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasVerticalSpacingInComponent: true,
    hasGrid: true,
    knobs: {
      ContentBlockHorizontal: () => ({
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
      }),
    },
  },
};
