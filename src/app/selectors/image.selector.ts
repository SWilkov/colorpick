import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromHexadecimal from '../reducers/hex.reducer';
import * as fromImage from '../reducers/image.reducer';

const imageState = (state: AppState) => state.image;
const hexState = (state: AppState) => state.hexadecimal;

export const selectOpacity = createSelector(
  imageState,
  (state) => fromImage.getOpacity(state)
);
