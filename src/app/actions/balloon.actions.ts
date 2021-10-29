import { createAction, props } from "@ngrx/store";

export const toggle = createAction(
  '[BALLOON] toggle ballon rising or falling'
);

export const takeOff = createAction(
  '[BALLOON] take off'
);
