
import { Action, createReducer, on } from '@ngrx/store';
import * as hexActions from '../actions/hex.actions';

export interface HexadecimalState {
  input: string;
  rgbValue: string;
  validatedHexValue: string;
  error: string;
  validating: boolean;
  validated: boolean;
}

const initialState: HexadecimalState = {
  input: '',
  rgbValue: '',
  validatedHexValue: '',
  error: '',
  validating: false,
  validated: false
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
    }))
);

export function hexadecimalReducer(state: HexadecimalState | undefined, action: Action) {
  return _hexReducer(state, action);
}
