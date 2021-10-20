import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as linkActions from '../actions/app-link.actions';
import { AppLinkService } from '../services/app-link.service';

@Injectable()
export class AppLinkEffects {
  constructor(private actions$: Actions,
    private appLinkService: AppLinkService) {

    }

  loadAppLinks$ = createEffect(() => this.actions$
    .pipe(
      ofType(linkActions.getAppLinks),
      mergeMap(() => this.appLinkService.get()
        .pipe(
          map((response) => linkActions.getAppLinksSuccess({ payload: response })),
          catchError((error) => of(linkActions.getAppLinksFailed({ payload: error })))
        ))
    ));
}