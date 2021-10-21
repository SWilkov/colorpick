import { Action, createReducer, on } from "@ngrx/store";
import * as balloonActions from '../actions/balloon.actions';

export interface BalloonState {
  isRising: boolean;
}

const initState: BalloonState = {
  isRising: false
};

const _balloonReducer = createReducer(
  initState,
  on(balloonActions.toggle,
    (state) => ({
      ...state,
      isRising: !state.isRising
    }))
);

export function balloonReducer(state: BalloonState | undefined, action: Action) {
  return _balloonReducer(state, action);
}

export const isRising = (state: BalloonState) => state.isRising;