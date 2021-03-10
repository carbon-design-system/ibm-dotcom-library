/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, select } from '@storybook/addon-knobs';
import on from 'carbon-components/es/globals/js/misc/on';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import DDSLeftNav from '../left-nav';
import '../masthead-container';
import styles from './masthead.stories.scss';
import { mastheadLinks as links, customLinks, l1Data, logoData } from './links';
import { UNAUTHENTICATED_STATUS } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import { authenticatedProfileItems, unauthenticatedProfileItems } from './profile-items';
import readme from './README.stories.mdx';

const userStatuses = {
  authenticated: 'test.user@ibm.com',
  unauthenticated: UNAUTHENTICATED_STATUS,
};

/**
 * platform knob data
 */
const platformData = {
  name: 'IBM Cloud',
  url: 'https://www.ibm.com/cloud',
};

export const Default = ({ parameters }) => {
  const { platform, profile, search, selectedMenuItem, searchPlaceholder, userStatus, navLinks } =
    parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            ?has-profile="${profile}"
            ?has-search="${search}"
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .navLinks="${navLinks}"
            ?has-profile="${profile}"
            ?has-search="${search}"
          ></dds-masthead-container>
        `}
  `;
};

export const WithCustomNavigation = ({ parameters }) => {
  const { platform, selectedMenuItem, userStatus, searchPlaceholder, profile, search } =
    parameters?.props?.MastheadComposite ?? {};
  return html`
    <style>
      ${styles}
    </style>
    <dds-masthead-composite
      platform="${ifNonNull(platform)}"
      platform-url="${ifNonNull(platformData.url)}"
      selected-menu-item="${ifNonNull(selectedMenuItem)}"
      user-status="${ifNonNull(userStatus)}"
      searchPlaceholder="${ifNonNull(searchPlaceholder)}"
      .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
      .navLinks="${customLinks}"
      ?has-profile="${profile}"
      ?has-search="${search}"
      .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
    ></dds-masthead-composite>
  `;
};

export const searchOpenByDefault = ({ parameters }) => {
  const { platform, selectedMenuItem, userStatus, searchPlaceholder, profile, search, navLinks } =
    parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            activate-search="true"
            platform="${ifNonNull(platformData.name)}"
            platform-url="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .navLinks="${navLinks}"
            ?has-profile="${profile}"
            ?has-search="${search}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            activate-search="true"
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .navLinks="${navLinks}"
            ?has-profile="${profile}"
            ?has-search="${search}"
          ></dds-masthead-container>
        `}
  `;
};

export const withPlatform = ({ parameters }) => {
  const { selectedMenuItem, userStatus, navLinks, profile, search, searchPlaceholder } =
    parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="${ifNonNull(platformData.name)}"
            platform-url="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .navLinks="${navLinks}"
            ?has-profile="${profile}"
            ?has-search="${search}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifNonNull(platformData.name)}"
            platform-url="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .navLinks="${navLinks}"
            ?has-profile="${profile}"
            ?has-search="${search}"
          ></dds-masthead-container>
        `}
  `;
};

withPlatform.story = {
  parameters: {
    knobs: {
      MastheadComposite: ({ groupId }) => ({
        profile: boolean('show the profile functionality (profile)', true, groupId),
        search: boolean('show the search functionality (search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Services & Consulting', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
      }),
    },
  },
};

export const withL1 = ({ parameters }) => {
  const { platform, selectedMenuItem, userStatus, navLinks, profile, search, searchPlaceholder } =
    parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            user-status="${ifNonNull(userStatus)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            ?has-profile="${profile}"
            ?has-search="${search}"
            .l1Data="${l1Data}"
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .l1Data="${l1Data}"
            .navLinks="${navLinks}"
          ></dds-masthead-container>
        `}
  `;
};

export const withAlternateLogoAndTooltip = ({ parameters }) => {
  const { platform, selectedMenuItem, userStatus, navLinks, profile, search, searchPlaceholder, mastheadLogo } =
    parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .navLinks="${navLinks}"
            .logoData="${mastheadLogo}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .navLinks="${navLinks}"
            .logoData="${mastheadLogo}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
          ></dds-masthead-container>
        `}
  `;
};

withAlternateLogoAndTooltip.story = {
  parameters: {
    knobs: {
      MastheadComposite: ({ groupId }) => ({
        platform: select('Platform (platform)', { none: null, platform: platformData.name }, null, groupId),
        profile: boolean('show the profile functionality (profile)', true, groupId),
        search: boolean('show the search functionality (search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Services & Consulting', groupId),
        mastheadLogo: select(
          'masthead logo data (logoData)',
          { defaultWithNoTooltip: null, alternateWithTooltip: logoData },
          logoData,
          groupId
        ),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
      }),
    },
  },
};

export default {
  title: 'Components/Masthead',
  decorators: [
    story => {
      if (!(window as any)._hPageShow) {
        (window as any)._hPageShow = on(window, 'pageshow', () => {
          const leftNav = document.querySelector('dds-left-nav');
          if (leftNav) {
            (leftNav as DDSLeftNav).expanded = false;
          }
        });
      }
      return story();
    },
  ],
  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
    knobs: {
      escapeHTML: false,
      MastheadComposite: ({ groupId }) => ({
        platform: select('Platform (platform)', { none: null, platform: platformData.name }, null, groupId),
        profile: boolean('show the profile functionality (profile)', true, groupId),
        search: boolean('show the search functionality (search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Services & Consulting', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
      }),
    },
    props: (() => {
      // Lets `<dds-masthead-container>` load the nav links
      const useMock = inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        MastheadComposite: {
          navLinks: !useMock ? undefined : links,
        },
        Other: {
          useMock,
        },
      };
    })(),
  },
};
