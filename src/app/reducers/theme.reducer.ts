import { act } from '@ngrx/effects';
import { Action, createReducer, on } from '@ngrx/store';
import * as themeActions from '../actions/theme.actions';
import { Theme } from '../models/theme.enum';

export interface ThemeState {
  theme: Theme;
}

const initState: ThemeState = {
  theme: Theme.Light 
};

const _themeReducer = createReducer(
  initState,
  on(themeActions.checkTheme,
    (state, {payload}) => ({
      ...state      
    })),
  on(themeActions.checkThemeSuccess,
    (state, {payload}) => ({
      ...state,
      theme: payload
    })),
  on(themeActions.checkThemeFailed,
    (state, {payload}) => ({
      ...state
    }))
);

export function themeReducer(state: ThemeState | undefined, action: Action) {
  return _themeReducer(state, action);
}

export const getTheme = (state: ThemeState) => state.theme;
