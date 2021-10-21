import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as themeActions from '../actions/theme.actions';
import { ThemeService } from '../services/theme.service';

@Injectable()
export class ThemeEffects {
  constructor(private actions$: Actions, 
    private themeService: ThemeService) {}

  change$ = createEffect(() => this.actions$
    .pipe(
      ofType(themeActions.checkTheme),
      switchMap(({payload: rgba}) => this.themeService.get(rgba)
        .pipe(
          map((response) => themeActions.checkThemeSuccess({ payload: response})),
          catchError((error) => of(themeActions.checkThemeFailed({ payload: error })))
        ))
    ));
}