import { act } from '@ngrx/effects';
import { Action, createReducer, on } from '@ngrx/store';
import * as hamburgerActions from '../actions/hamburger.actions';

export enum MenuState { 
  OPENED = 'opened',
  CLOSED = 'closed'
}

export interface HamburgerState {
  menuVisible: boolean;
  menuState: MenuState;
}

const initState: HamburgerState = {
  menuVisible: true,
  menuState: MenuState.OPENED
};

const _hamburgerReducer = createReducer(
  initState,

  on(hamburgerActions.toggleMenu,
    (state) => ({
      ...state,
      menuVisible: !state.menuVisible,
      menuState: state.menuState === MenuState.CLOSED ? MenuState.OPENED : MenuState.CLOSED
    }))
);

export function hamburgerReducer(state: HamburgerState, action: Action) {
  return _hamburgerReducer(state, action);
}

export const getHamburgerVisible = (state: HamburgerState) => state.menuVisible;
export const getMenuState = (state: HamburgerState) => state.menuState;