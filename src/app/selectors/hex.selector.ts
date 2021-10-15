import { createSelector } from "@ngrx/store";
import { AppState } from "../reducers";
import * as fromHex from '../reducers/hex.reducer';

const getHexadecimalState = (state: AppState) => state.hexadecimal;

export const selectValidating = createSelector(
  getHexadecimalState,
  fromHex.getValidating
);

export const selectValidated = createSelector(
  getHexadecimalState,
  fromHex.getValidated
);

export const selectOriginalInput = createSelector(
  getHexadecimalState,
  fromHex.getOriginalInput
);

export const selectCalculating = createSelector(
  getHexadecimalState,
  fromHex.getCalculating
);

export const selectCalculated = createSelector(
  getHexadecimalState,
  fromHex.getCalculated
);

export const selectRgbType = createSelector(
  getHexadecimalState,
  fromHex.getRgbType
);

export const selectRgbValue = createSelector(
  getHexadecimalState,
  fromHex.getRgbValue
);

export const selectRgba = createSelector(
  getHexadecimalState,
  fromHex.getRgba
);
