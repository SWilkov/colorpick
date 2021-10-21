import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromBalloon from '../reducers/balloon.reducer';

const balloonState = (state: AppState) => state.balloon;

export const selectIsRising = createSelector(
  balloonState,
  fromBalloon.isRising
);

