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

export interface AppState {
  hexadecimal: fromHexadecimal.HexadecimalState
}

export const reducers: ActionReducerMap<AppState> = {
  hexadecimal: fromHexadecimal.hexadecimalReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
