import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ImageService } from "../services/image.service";
import * as imageActions from '../actions/image.actions';
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ImageEffects {
  constructor(private actions$: Actions,
    private imageService: ImageService) {

    }

  calculateOpacity$ = createEffect(() => this.actions$
    .pipe(
      ofType(imageActions.calculateOpacity),
      switchMap(({payload: input}) => of(this.imageService.getOpacityFromAlpha(input))
        .pipe(
          map((response) => imageActions.calculateOpacitySuccess({ payload: response })),
          catchError((error) => of(imageActions.calculateOpacityFailed({ payload: error}))
        ))
    )));    
}