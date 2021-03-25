/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const puppeteer = require('puppeteer');
const percySnapshot = require('@percy/puppeteer');

/**
 * Flag to switch to the web components paths instead of the React ones
 *
 * @type {boolean}
 * @private
 */
const _webcomponentsTests =
  (process && process.env.WEBCOMPONENTS_TESTS === 'true') || false;

/**
 * Sets the default url
 *
 * @type {string}
 * @private
 */
const _urlDefault = _webcomponentsTests
  ? 'https://ibmdotcom-web-components-canary.mybluemix.net'
  : 'https://ibmdotcom-react-canary.mybluemix.net';

/**
 * Defines the host for testing
 *
 * @type {string | string}
 * @private
 */
const _url = (process && process.env.SELENIUM_HOST) || _urlDefault;

/**
 * Sets the correct path (Manually defined menu items)
 *
 * @type {string}
 * @private
 */
const _pathManual =
  '/iframe.html?id=components-table-of-contents--manually-define-menu-items';

describe('Table of contents', () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should load g100 theme', async () => {
    page = await browser.newPage();
    await page.goto(`${_url}${_pathManual}&theme=g100`, {
      waitUntil: 'load',
      timeout: 30000,
    });

    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g100")'
    );

    await percySnapshot(page, 'Components|Table of contents: g100 theme', {
      widths: [320, 1280],
    });
  });

  it('should load g90 theme', async () => {
    page = await browser.newPage();
    await page.goto(`${_url}${_pathManual}&theme=g90`, {
      waitUntil: 'load',
      timeout: 30000,
    });

    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g90")'
    );

    await percySnapshot(page, 'Components|Table of contents: g90 theme', {
      widths: [320, 1280],
    });
  });

  it('should load g10 theme', async () => {
    page = await browser.newPage();
    await page.goto(`${_url}${_pathManual}&theme=g10`, {
      waitUntil: 'load',
      timeout: 30000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g10")'
    );

    await percySnapshot(page, 'Components|Table of contents: g10 theme', {
      widths: [320, 1280],
    });
  });
});
