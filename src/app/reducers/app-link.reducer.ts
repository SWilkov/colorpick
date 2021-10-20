import { Action, createReducer, on } from '@ngrx/store';
import * as linkActions from '../actions/app-link.actions';
import { AppLink } from '../models/app-link.model';

export interface AppLinkState {
  appLinks: AppLink[];
  loading: boolean;
  loaded: boolean;
}

const initState: AppLinkState = {
  appLinks: [],
  loading: false,
  loaded: false
};

const _appLink = createReducer(
  initState,

  on(linkActions.getAppLinks,
    (state) => ({
      ...state,
      loading: true
    })),
  on(linkActions.getAppLinksSuccess,
    (state, {payload}) => ({
      ...state,
      appLinks: payload,
      loading: false,
      loaded: true
    })),
  on(linkActions.getAppLinksFailed,
    (state, {payload}) => ({
      ...state,
      loading: false
    }))
);

export function appLinkReducer(state: AppLinkState | undefined, action: Action) {
  return _appLink(state, action);
}

export const getAppLinks = (state: AppLinkState) => state.appLinks;
export const getAppLinksLoading = (state: AppLinkState) => state.loading;
export const getAppLinksLoaded = (state: AppLinkState) => state.loaded;
