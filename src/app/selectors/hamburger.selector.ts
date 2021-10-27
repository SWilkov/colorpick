import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromHamburger from '../reducers/hamburger.reducer';

const getHamburgerState = (state: AppState) => state.hamburger;

export const selectHamburgerMenuVisible = createSelector(
  getHamburgerState,
  fromHamburger.getHamburgerVisible
);

export const selectHamburgerMenuState = createSelector(
  getHamburgerState,
  fromHamburger.getMenuState
);
