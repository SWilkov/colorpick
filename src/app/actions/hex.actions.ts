import { createAction, props } from "@ngrx/store";
import { RgbType } from "../models/rgb-type.model";

export const validateHex = createAction(
  '[HEXADECIMAL] Validate hex]',
  props<{payload: string}>()
);

export const validateHexSuccess = createAction(
  '[HEXADECIMAL] Validate hex success]',
  props<{payload: string}>()
);

export const validateHexFailure = createAction(
  '[HEXADECIMAL] Validate hex failed',
  props<{payload: string}>()
);

export const removeHash = createAction(
  '[HEXADECIMAL remove hash from hexadecimal input]',
  props<{payload: string}>()
);

export const calulateRgbType = createAction(
  '[HEXADECIMAL] calculate rgb type]',
  props<{payload: string}>()
);

export const calulateRgbTypeResult = createAction(
  '[HEXADECIMAL] calculate rgb type result]',
  props<{payload: RgbType}>()
);

export const calculateRgbFromHexadecimal = createAction(
  '[HEXADECIMAL] calculate rgb from hexadecimal',
  props<{payload: string}>()
);

export const calculateRgbFromHexadecimalSuccess = createAction(
  '[HEXADECIMAL calculate rgb from hexadecimal success',
  props<{payload: number[][]}>()
);

export const clearHexInput = createAction(
  '[HEXADECIMAL] clear hex input'
);

export const sumHexadecimals = createAction(
  '[HEXADECIMAL] sum hexadecimals',
  props<{payload: number[]}>()
);

export const getOpacityFromAlphaTransparency = createAction(
  '[HEXADECIMAL] get opacity from alpha tranparency]',
  props<{payload: number}>()
);

export const calculateRgbFromHexadecimalFailed = createAction(
  '[HEXADECIMAL] calculate rgb from hexadecimal failed',
  props<{payload: Error}>()
);

export const splitHexInputForRgb = createAction(
  '[HEXADECIMAL split hex]',
  props<{payload: string}>()
);

export const calculateDecimalValueOfHexadecimal = createAction(
  '[HEXADECIMAL] calculate decimal value]',
  props<{payload: string[]}>()
);

//get binary
export const calculateBinary = createAction(
  '[HEXADECIMAL] calculate binary]',
  props<{input: string}>()
);

export const calculateBinarySuccess = createAction(
  '[HEXADECIMAL] calculate binary success]',
  props<{payload: string[]}>()
);

export const calculateBinaryFailed = createAction(
  '[HEXADECIMAL] calculate binary]',
  props<{payload: Error}>()
);

export const clearBinary = createAction(
  '[HEXADECIMAL] clear binary'
);