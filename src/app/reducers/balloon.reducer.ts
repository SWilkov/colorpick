import { Action, createReducer, on } from "@ngrx/store";
import * as balloonActions from '../actions/balloon.actions';
import { BalloonEffects } from "../effects/balloon.effects";

export interface BalloonState {
  animationRunning: boolean;
  duration: number;
}

const initState: BalloonState = {
  animationRunning: false,
  duration: 3000
};

const _balloonReducer = createReducer(
  initState,
  on(balloonActions.startAnimation,
    (state, {payload}) => ({
      ...state,
      animationRunning: true,
      duration: payload
    })),
  on(balloonActions.animationEnded,
    (state) => ({
      ...state,
      animationRunning: false
    }))
);

export function balloonReducer(state: BalloonState | undefined, action: Action) {
  return _balloonReducer(state, action);
}

export const getAnimationRunning = (state: BalloonState) => state.animationRunning;