import { createSelector } from "@ngrx/store";
import { AppState } from "../reducers";
import * as fromNavigation from '../reducers/navigation.reducer';

const getNavigationState = (state: AppState) => state.navigation;

export const selectCurrentPage = createSelector(
  getNavigationState,
  fromNavigation.getCurrentPage
);
