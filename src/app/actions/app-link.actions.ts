import { createAction, props } from "@ngrx/store";
import { AppLink } from "../models/app-link.model";

export const getAppLinks = createAction(
  '[LINKS] get app links'
);

export const getAppLinksSuccess = createAction(
  '[LINKS] get app links success',
  props<{payload: AppLink[]}>()
);

export const getAppLinksFailed = createAction(
  '[LINKS] get app links failed',
  props<{payload: Error}>()
);
