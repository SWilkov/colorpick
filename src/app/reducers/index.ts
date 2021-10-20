import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as fromHexadecimal from './hex.reducer';
import * as fromImage from './image.reducer';
import * as fromBalloon from './balloon.reducer';
import * as fromLinks from './app-link.reducer';
export interface AppState {
  hexadecimal: fromHexadecimal.HexadecimalState,
  image: fromImage.ImageState,
  balloon: fromBalloon.BalloonState,
  appLink: fromLinks.AppLinkState
}

export const reducers: ActionReducerMap<AppState> = {
  hexadecimal: fromHexadecimal.hexadecimalReducer,
  image: fromImage.imageReducer,
  balloon: fromBalloon.balloonReducer,
  appLink: fromLinks.appLinkReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
