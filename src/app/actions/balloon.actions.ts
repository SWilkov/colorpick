import { createAction, props } from "@ngrx/store";

export const startAnimation = createAction(
  '[BALLOON] start animation',
  props<{payload: number}>()
);

export const animationEnded = createAction(
  '[BALLOON] animation ended'
);
