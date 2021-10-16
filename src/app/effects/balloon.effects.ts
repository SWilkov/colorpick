import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { delay, map, mergeMap, switchMap } from "rxjs/operators";
import * as balloonActions from '../actions/balloon.actions';

@Injectable()
export class BalloonEffects {
  constructor(private actions$: Actions) {

  }

  startAnimation$ = createEffect(() => this.actions$
    .pipe(
      ofType(balloonActions.startAnimation),
      mergeMap(({payload: duration}) => of(duration)
        .pipe(
          delay(duration),
          map((resp => balloonActions.animationEnded()))
        )
      )      
    ));
}