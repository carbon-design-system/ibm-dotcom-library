/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const puppeteer = require('puppeteer');
const percySnapshot = require('@percy/puppeteer');

/**
 * Defines the host for testing
 *
 * @type {string | string}
 * @private
 */
const _url =
  (process && process.env.SELENIUM_HOST) ||
  'https://ibmdotcom-react-canary.mybluemix.net';

/**
 * Flag to switch to the web components paths instead of the React ones
 *
 * @type {boolean}
 * @private
 */
const _webcomponentsTests =
  (process && process.env.WEBCOMPONENTS_TESTS === 'true') || false;

/**
 * Sets the correct path (default Masthead)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-masthead--default';

/**
 * Sets the correct path (Custom Masthead)
 *
 * @type {string}
 * @private
 */
const _pathCustom =
  '/iframe.html?id=components-masthead--with-custom-navigation';

/**
 * Sets the correct path (Masthead with Platform)
 *
 * @type {string}
 * @private
 */
const _pathPlatform = '/iframe.html?id=components-masthead--with-platform';

describe('Masthead: Default', () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should take a snapshot of the megamenu', async () => {
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 780,
    });

    await page.goto(`${_url}${_pathDefault}`, {
      waitUntil: 'load',
      timeout: 30000,
    });
    await page.waitForTimeout(3000);

    await page.click('[data-autoid="dds--masthead-default__l0-nav0"]');
    await percySnapshot(
      page,
      'Components|Masthead: Default - Mega Menu (Nav 0)',
      {
        widths: [1280],
      }
    );
    await page.click('[data-autoid="dds--masthead-default__l0-nav1"]');

    await percySnapshot(
      page,
      'Components|Masthead: Default - Mega Menu (Nav 1)',
      {
        widths: [1280],
      }
    );
  });

  it('should open the login menu', async () => {
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 780,
    });

    await page.goto(`${_url}${_pathDefault}`, {
      waitUntil: 'load',
      timeout: 30000,
    });

    await page.waitForTimeout(3000);

    if (_webcomponentsTests) {
      const profile = await page.evaluateHandle(
        `document.querySelector('dds-masthead-profile').shadowRoot.querySelector('a')`
      );
      profile.click();
    } else {
      await page.click('[data-autoid="dds--masthead-default__l0-account"]');
    }

    await percySnapshot(page, 'Components|Masthead: Default - Profile Menu', {
      widths: [1280],
    });
  });

  it('should open the search bar', async () => {
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 780,
    });

    await page.goto(`${_url}${_pathDefault}`, {
      waitUntil: 'load',
      timeout: 30000,
    });

    await page.waitForTimeout(3000);

    if (_webcomponentsTests) {
      const search = await page.evaluateHandle(
        `document.querySelector('dds-masthead-search').shadowRoot.querySelector('.bx--header__search--search')`
      );
      search.click();
    } else {
      await page.click('[data-autoid="dds--masthead-default__l0-search"]');
    }

    await percySnapshot(page, 'Components|Masthead: Default - Search', {
      widths: [1280],
    });
  });

  it('should take a snapshot of the mobile menu', async () => {
    page = await browser.newPage();
    await page.setViewport({
      width: 320,
      height: 780,
    });

    await page.goto(`${_url}${_pathDefault}`, {
      waitUntil: 'load',
      timeout: 30000,
    });

    await page.waitForTimeout(3000);

    if (_webcomponentsTests) {
      const menuButton = await page.evaluateHandle(
        `document.querySelector('dds-masthead-menu-button').shadowRoot.querySelector('button')`
      );
      menuButton.click();
    } else {
      await page.click(
        '[data-autoid="dds--masthead-default-sidenav__l0-menu"]'
      );
    }

    await percySnapshot(page, 'Components|Masthead: Default - Mobile Menu', {
      widths: [320],
    });

    if (_webcomponentsTests) {
      const nav1 = await page.evaluateHandle(
        `document.querySelector('dds-left-nav-menu:nth-child(1)').shadowRoot.querySelector('button')`
      );
      nav1.click();
    } else {
      await page.click(
        '[data-autoid="dds--masthead-default-sidenav__l0-nav0"]'
      );
    }

    await percySnapshot(
      page,
      'Components|Masthead: Default - Mobile Menu Level 2',
      {
        widths: [320],
      }
    );
  });

  it('should scroll the L0 overflow properly', async () => {
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 780,
    });

    await page.goto(`${_url}${_pathCustom}`, {
      waitUntil: 'load',
      timeout: 30000,
    });

    await page.waitForTimeout(3000);

    if (_webcomponentsTests) {
      const overflow = await page.evaluateHandle(
        `document.querySelector('dds-top-nav').shadowRoot.querySelector('.bx--header__nav-caret-right-container > button')`
      );
      overflow.click();
    } else {
      await page.click('.bx--header__nav-caret-right');
    }

    await page.waitForTimeout(3000);
    await percySnapshot(page, 'Components|Masthead: Custom - Overflow', {
      widths: [1280],
    });
  });

  it('should open the search bar with platform', async () => {
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 780,
    });

    await page.goto(`${_url}${_pathPlatform}`, {
      waitUntil: 'load',
      timeout: 30000,
    });

    await page.waitForTimeout(3000);

    if (_webcomponentsTests) {
      const search = await page.evaluateHandle(
        `document.querySelector('dds-masthead-search').shadowRoot.querySelector('.bx--header__search--search')`
      );
      search.click();
    } else {
      await page.click('[data-autoid="dds--masthead-eco__l0-search"]');
    }

    await percySnapshot(page, 'Components|Masthead: With Platform - Search', {
      widths: [1280],
    });
  });
});
