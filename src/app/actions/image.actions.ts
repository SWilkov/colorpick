import { createAction, props } from "@ngrx/store";
import { Rgba } from "../models/rgba.model";

export const calculateOpacity = createAction(
  '[IMAGE] calculate opacity',
  props<{payload: Rgba}>()
);

export const calculateOpacitySuccess = createAction(
  '[IMAGE] calculate opacity success',
  props<{payload: number}>()
);

export const calculateOpacityFailed = createAction(
  '[IMAGE] calculate opacity failed',
  props<{payload: Error}>()
);