import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromTheme from '../reducers/theme.reducer';
import * as fromHex from '../reducers/hex.reducer';

const themeState = (state: AppState) => state.theme;

export const selectTheme = createSelector(
  themeState, 
  fromTheme.getTheme
);
