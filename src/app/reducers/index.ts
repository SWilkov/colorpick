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
import * as fromTheme from './theme.reducer';
import * as fromHamburger from './hamburger.reducer';
export interface AppState {
  hexadecimal: fromHexadecimal.HexadecimalState,
  image: fromImage.ImageState,
  balloon: fromBalloon.BalloonState,
  appLink: fromLinks.AppLinkState,
  theme: fromTheme.ThemeState,
  hamburger: fromHamburger.HamburgerState
}

export const reducers: ActionReducerMap<AppState> = {
  hexadecimal: fromHexadecimal.hexadecimalReducer,
  image: fromImage.imageReducer,
  balloon: fromBalloon.balloonReducer,
  appLink: fromLinks.appLinkReducer,
  theme: fromTheme.themeReducer,
  hamburger: fromHamburger.hamburgerReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
