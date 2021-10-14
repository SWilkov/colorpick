import { createAction, props } from "@ngrx/store";
import { RgbType } from "../models/rgb-type.model";

export const validateHex = createAction(
  '[HEXADECIMAL Validate hex]',
  props<{payload: string}>()
);

export const validateHexSuccess = createAction(
  '[HEXADECIMAL Validate hex success]',
  props<{payload: string}>()
);

export const validateHexFailure = createAction(
  '[HEXADECIMAL Validate hex failed',
  props<{payload: string}>()
);

export const removeHash = createAction(
  '[HEXADECIMAL remove hash from hexadecimal input]',
  props<{payload: string}>()
);

export const calulateRgbType = createAction(
  '[HEXADECIMAL calculate rgb type]',
  props<{payload: string}>()
);

export const calulateRgbTypeResult = createAction(
  '[HEXADECIMAL calculate rgb type result]',
  props<{payload: RgbType}>()
);
