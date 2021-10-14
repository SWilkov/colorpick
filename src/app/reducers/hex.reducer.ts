
import { Action, createReducer, on } from '@ngrx/store';
import * as hexActions from '../actions/hex.actions';
import { RgbType } from '../models/rgb-type.model';

export interface HexadecimalState {
  input: string;
  rgbValue: number[];
  rgbType: RgbType;
  validatedHexValue: string;
  error: string;
  validating: boolean;
  validated: boolean;
  calculating: boolean;
  calculated: boolean;
}

const initialState: HexadecimalState = {
  input: '',
  rgbValue: [],
  rgbType: RgbType.invalid,
  validatedHexValue: '',
  error: '',
  validating: false,
  validated: false,
  calculating: false,
  calculated: false
};

const _hexReducer = createReducer(
  initialState,

  on(hexActions.validateHex,
    (state, {payload}) => ({
      ...state,
      validating: true
    })),
  on(hexActions.validateHexSuccess,
    (state, {payload}) => ({
      ...state,
      validating: false,
      validated: true,
      validatedHexValue: payload
    })),
  on(hexActions.validateHexFailure,
    (state, {payload}) => ({
      ...state,
      validating: false,
      error: payload
    })),

  on(hexActions.calulateRgbType,
    (state, {payload}) => ({
      ...state
    })),
  on(hexActions.calulateRgbTypeResult,
    (state, {payload}) => ({
      ...state,
      rgbType: payload
    })),
  
  on(hexActions.calculateRgbFromHexadecimal,
    (state, {payload}) => ({
      ...state,
      calculating: true
    })),
  on(hexActions.calculateRgbFromHexadecimalSuccess,
    (state, {payload}) => ({
      ...state,
      calculating: false,
      calculated: true,
      rgbValue: payload.map(x => x.reduce((a, b) => a + b, 0))
    })),
  on(hexActions.calculateRgbFromHexadecimalFailed,
    (state, {payload}) => ({
      ...state,
      calculating: false
    }))
);

export function hexadecimalReducer(state: HexadecimalState | undefined, action: Action) {
  return _hexReducer(state, action);
};

export const getCalculating = (state: HexadecimalState | undefined) => state?.calculating;
export const getCalculated = (state: HexadecimalState | undefined) => state?.calculated;

export const getValidating = (state: HexadecimalState | undefined) => state?.validating;
export const getValidated = (state: HexadecimalState | undefined) => state?.validated;

export const getOriginalInput = (state: HexadecimalState | undefined) => state?.input;
export const getRgbValue = (state: HexadecimalState | undefined) => state?.rgbValue;
export const getRgbType = (state: HexadecimalState | undefined) => state?.rgbType;
