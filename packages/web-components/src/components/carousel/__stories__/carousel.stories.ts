/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import '../../card/card';
import '../../card/card-footer';
import '../../card/card-heading';
import '../../content-section/content-section';
import '../../content-section/content-section-copy';
import '../../content-section/content-section-heading';
import '../../link-with-icon/link-with-icon';
import '../carousel';
import readme from './README.stories.mdx';

const hrefDefault = 'https://www.ibm.com/standards/web/carbon-for-ibm-dotcom';
const headingDefault = 'Lorem ipsum dolor sit amet';
const copyDefault = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.';
const copyOdd = `
  ${copyDefault}
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

const Card = ({ copy = copyDefault, heading = headingDefault, href = hrefDefault } = {}) => html`
  <dds-card href="${ifNonNull(href)}">
    <dds-card-heading>${heading}</dds-card-heading>
    ${copy}
    <dds-card-footer>
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-card>
`;

export const Default = () => {
  return html`
    <dds-carousel>
      ${Card()}${Card({ copy: copyOdd })}${Card()}${Card({ copy: copyOdd })}${Card()}
    </dds-carousel>
  `;
};

export default {
  title: 'Components/Carousel',
  parameters: {
    ...readme.parameters,
  },
};
