/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pickBy from 'lodash-es/pickBy.js';
import { ActionCreatorsMapObject, Dispatch, Store, bindActionCreators } from 'redux';
import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { LocaleAPIState } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI';
import { MastheadLink, TranslateAPIState } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI';
import store from '../../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { loadLanguage, setLanguage } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';
import { LocaleAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';
import { loadTranslation } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI';
import { TranslateAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI';
import { loadUserStatus } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/profileAPI';
import { ProfileAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/profileAPI';
import { loadSearchResults } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI';
import { SearchAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI';
import ConnectMixin from '../../../globals/mixins/connect';
import {
  MastheadSearchContainerState,
  MastheadSearchContainerStateProps,
  MastheadSearchContainerActions,
} from '../masthead-search-container';
import DDSCloudMastheadComposite from './cloud-masthead-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Redux state used for `<dds-cloud-masthead-container>`.
 */
export interface CloudMastheadContainerState extends MastheadSearchContainerState {
  /**
   * The Redux state for `LocaleAPI`.
   */
  localeAPI?: LocaleAPIState;

  /**
   * The Redux state for `TranslateAPI`.
   */
  translateAPI?: TranslateAPIState;
}

/**
 * The properties for `<dds-cloud-masthead-container>` from Redux state.
 */
export interface CloudMastheadContainerStateProps extends MastheadSearchContainerStateProps {
  /**
   * The nav links.
   */
  navLinks?: MastheadLink[];

  /**
   * The user authentication status.
   */
  userStatus?: string;
}

/**
 * The Redux actions used for `<dds-cloud-masthead-container>.
 */
export type CloudMastheadContainerActions =
  | MastheadSearchContainerActions
  | ReturnType<typeof loadLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadTranslation>
  | ReturnType<typeof loadUserStatus>;

/**
 * @param state The Redux state for masthead.
 * @returns The converted version of the given state, tailored for `<dds-cloud-masthead-container>`.
 */
export function mapStateToProps(state: CloudMastheadContainerState): CloudMastheadContainerStateProps {
  const { localeAPI, translateAPI, searchAPI } = state;
  const { language } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  const { currentSearchQueryString, searchResults } = searchAPI ?? {};
  let currentSearchResults;
  for (let { length = 0 } = currentSearchQueryString ?? {}; !currentSearchResults && length > 0; --length) {
    currentSearchResults = searchResults?.[currentSearchQueryString!.substr(0, length)]?.[language!];
  }
  return pickBy(
    {
      authenticatedProfileItems: !language ? undefined : translations?.[language]?.profileMenu.signedin,
      navLinks: !language ? undefined : translations?.[language]?.mastheadNav?.links,
      unauthenticatedProfileItems: !language ? undefined : translations?.[language]?.profileMenu.signedout,
      currentSearchResults: currentSearchResults ?? [],
    },
    value => value !== undefined
  );
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-cloud-masthead-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<LocaleAPIActions | TranslateAPIActions | ProfileAPIActions>) {
  return bindActionCreators<CloudMastheadContainerActions, ActionCreatorsMapObject<CloudMastheadContainerActions>>(
    {
      _loadLanguage: loadLanguage,
      _setLanguage: setLanguage,
      _loadTranslation: loadTranslation,
      _loadUserStatus: loadUserStatus,
      _loadSearchResults: loadSearchResults,
    },
    dispatch as Dispatch // TS definition of `bindActionCreators()` seems to have no templated `Dispatch`
  );
}

/**
 * Container component for masthead.
 *
 * @element dds-cloud-masthead-container
 */
@customElement(`${ddsPrefix}-cloud-masthead-container`)
class DDSCloudMastheadContainer extends ConnectMixin<
  CloudMastheadContainerState,
  LocaleAPIActions | TranslateAPIActions | ProfileAPIActions | SearchAPIActions,
  CloudMastheadContainerStateProps,
  ActionCreatorsMapObject<CloudMastheadContainerActions>
>(
  store as Store<CloudMastheadContainerState, LocaleAPIActions | TranslateAPIActions | ProfileAPIActions | SearchAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSCloudMastheadComposite) {}

export default DDSCloudMastheadContainer;
