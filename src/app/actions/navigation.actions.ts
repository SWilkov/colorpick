import { createAction, props } from "@ngrx/store";
import { Page } from "../models/page.enum";

export const navigationChanged = createAction(
  '[NAVIGATION] navigation changed',
  props<{payload: Page}>()
);
