import { Action, createReducer, on } from "@ngrx/store";
import * as imageActions from '../actions/image.actions';

export interface ImageState {
  opacity: number;
  loading: boolean;
  loaded: boolean;
}

const initState: ImageState = {
  opacity: 1,
  loading: false,
  loaded: false
};

const _imageReducer = createReducer(
  initState,

  on(imageActions.calculateOpacity,
    (state, {payload}) => ({
      ...state,
      loading: true
    })),
  on(imageActions.calculateOpacitySuccess,
    (state, {payload}) => ({
      ...state,
      loading: false,
      loaded: true,
      opacity: payload
    })),
  on(imageActions.calculateOpacityFailed,
    (state, {payload}) => ({
      ...state,
      loading: false
    }))
);

export function imageReducer(state: ImageState | undefined, action: Action) {
  return _imageReducer(state, action);
}

export const getOpacity = (state: ImageState) => state?.opacity;
