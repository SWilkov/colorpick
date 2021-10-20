
import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromLinks from '../reducers/app-link.reducer';

const appLinkState = (state: AppState) => state.appLink;

export const selectAppLinks = createSelector(
  appLinkState,
  fromLinks.getAppLinks
);

export const selectLoading = createSelector(
  appLinkState,
  fromLinks.getAppLinksLoading
);

export const selectLoaded = createSelector(
  appLinkState,
  fromLinks.getAppLinksLoaded
);