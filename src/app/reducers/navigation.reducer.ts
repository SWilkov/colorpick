import { Action, createReducer, on } from "@ngrx/store";
import { Page } from "../models/page.enum";
import * as navigationActions from '../actions/navigation.actions';
import { act } from "@ngrx/effects";

export interface NavigationState {
  currentPage: Page;
}

const initState: NavigationState = {
  currentPage: Page.rgba
};

const _navigationReducer = createReducer(
  initState,

  on(navigationActions.navigationChanged,
    (state, {payload}) => ({
      ...state,
      currentPage: payload
    }))
);

export function navigationReducer(state: NavigationState, action: Action) {
  return _navigationReducer(state, action);
}

export const getCurrentPage = (state: NavigationState) => state.currentPage;
