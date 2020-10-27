/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mockAxios from 'axios';
import oldSession from './data/timestamp_response.json';
import responseSuccess from './data/response.json';
import root from 'window-or-global';
import TranslationAPI from '../Translation';

jest.mock('../../Locale', () => ({
  LocaleAPI: {
    getLocale: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
  },
}));

jest.mock('axios', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({ data: require('./data/response.json') })
    ),
  };
});

const sessionStorageMock = (() => {
  let cache = {};

  return {
    getItem(key) {
      return cache[key] || null;
    },
    setItem(key, value) {
      value = JSON.parse(value);
      value['id'] = 'TRANSLATION_FRESH';
      cache[key] = JSON.stringify(value);
    },
    removeItem(key) {
      delete cache[key];
    },
    clear() {
      cache = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

describe('TranslationAPI', () => {
  const { location } = root;

  afterEach(() => {
    jest.resetModules();
    root.location = location;
  });

  it('should replace the signout url "state" param with current location', async () => {
    delete root.location;

    root.location = {
      href: 'https://www.loremipsum.com',
    };

    const response = await TranslationAPI.getTranslation({
      lc: 'en',
      cc: 'us',
    });

    expect(
      response.profileMenu.signedout[1].url.indexOf(
        'https%3A%2F%2Fwww.loremipsum.com'
      )
    ).toBeGreaterThan(-1);
  });

  it('should fetch the i18n data', async () => {
    // Expected endpoint called
    const endpoint = `${process.env.TRANSLATION_HOST}/common/v18/js/data/jsononly`;
    const fetchUrl = `${endpoint}/usen.json`;

    const response = await TranslationAPI.getTranslation({
      lc: 'en',
      cc: 'us',
    });

    const elseResponse = await TranslationAPI.getTranslation({});
    delete elseResponse['id'];

    expect(elseResponse).toEqual(responseSuccess);

    expect(mockAxios.get).toHaveBeenCalledWith(fetchUrl, {
      headers: {
        'Content-Type': 'text/plain',
        origin: 'https://ibm.com',
      },
    });
    delete response['id'];
    expect(response).toEqual(responseSuccess);
  });

  it('should return a json with a recent timestamp', async () => {
    const mockDate = 1546300800000; // Epoch time of January 1, 2019 midnight UTC
    global.Date.now = jest.fn(() => mockDate);

    // using very old cached session
    sessionStorageMock.setItem(
      'dds-translation-us-en',
      JSON.stringify(oldSession)
    );

    const previousSession = JSON.parse(
      sessionStorageMock.getItem('dds-translation-us-en')
    );

    expect(previousSession.id).toEqual('TRANSLATION_FRESH');

    const response = await TranslationAPI.getTranslation({
      lc: 'en',
      cc: 'us',
    });

    const newSession = JSON.parse(
      sessionStorageMock.getItem('dds-translation-us-en')
    );

    response['id'] = newSession.id;

    // newest response and storage data should match
    expect(response).toEqual(newSession);

    // should contain timestamp
    expect(response).toHaveProperty('timestamp');

    // should equal mock timestamp
    expect(response.timestamp).toEqual(mockDate);
    expect(response.id).toEqual('TRANSLATION_FRESH');
  });

  it('timestamp should not change if within two hours', async () => {
    // using recent cached session
    sessionStorageMock.setItem(
      'dds-translation-us-en',
      JSON.stringify(responseSuccess)
    );

    const previousSession = JSON.parse(
      sessionStorageMock.getItem('dds-translation-us-en')
    );

    const response = await TranslationAPI.getTranslation({
      lc: 'en',
      cc: 'us',
    });

    // body and timestamp should remain unchanged
    expect(response).toEqual(previousSession);
  });

  afterEach(() => {
    TranslationAPI.clearCache();
  });
});
