/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import packageJson from '../../../package.json';

/* eslint-disable import/prefer-default-export,max-len */

/**
 * Renders the component(s) script tag content and returns back the string
 *
 * @param {Array} components array of component names
 * @param {string} tag tag folder
 */
function _renderScript(components, tag) {
  let scripts = '';
  components.forEach(component => {
    scripts += `<script type="module" src="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/${tag}/${component}.min.js"></script>\n`;
  });
  return scripts;
}

/**
 * Renders the component(s) style tag content and returns back the string
 *
 * @param {Array} components array of component names
 * @param {string} tag tag folder
 */
function _renderStyle(components, tag) {
  let styles = '';
  components.forEach(component => {
    styles += `<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/${tag}/${component}.css" />\n`;
  });
  return styles;
}

/**
 * This is the markdown block for JS via CDN
 *
 * @param {Array} components array of components to render
 */
export const cdnJs = ({ components }) => {
  return `
### JS (via CDN)

\`\`\`html
// SPECIFIC VERSION (available starting v1.6.0)
${_renderScript(components, `version/v${packageJson.version}`)}

// LATEST tag
${_renderScript(components, 'tag/v1/latest')}

// NEXT tag
${_renderScript(components, 'tag/v1/next')}

// BETA tag
${_renderScript(components, 'tag/v1/beta')}
\`\`\`

> NOTE: The latest/next/beta tags are moving versions. While beneficial to
> always stay on the most recent version, it is recommended to choose a specific
> version and properly test your application when upgrading to a newer version.
  `;
};

/**
 * This is the markdown block for Additional CSS via CDN
 *
 * @param {Array} components array of components to render
 */
export const cdnCssAdditional = ({ components }) => {
  return `
### CSS (via CDN)

This component includes additional styles that are used on the page level in
order for the component to behave properly. If not including the SCSS version
in your application's style bundle, this can be included via CDN:

\`\`\`html
// SPECIFIC VERSION (available starting v1.6.0)
${_renderStyle(components, `version/v${packageJson.version}`)}

// LATEST tag
${_renderStyle(components, 'tag/v1/latest')}

// NEXT tag
${_renderStyle(components, 'tag/v1/next')}

// BETA tag
${_renderStyle(components, 'tag/v1/beta')}
\`\`\`
  `;
};

/**
 * This is the markdown block for CSS via CDN
 */
export const cdnCss = () => {
  return `
### Carbon CDN style helpers (optional)

There are optional CDN artifacts available that can assist with global Carbon
styles in lieu of including into your specific application bundle.

[Click here to learn more](/docs/overview-carbon-cdn-style-helpers--page)\n\n
  `;
};
