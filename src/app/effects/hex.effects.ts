
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as hexActions from '../actions/hex.actions';
import { HexService } from '../services/hex.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as hexDomain from '../data/hexadecimal.domain';
import { RgbType } from '../models/rgb-type.model';
import { hexadecimalReducer } from '../reducers/hex.reducer';

@Injectable()
export class HexEffects {
  constructor(private actions$: Actions,
    private hexService: HexService) {
  }

  validateHex$ = createEffect(() => this.actions$
    .pipe(
      ofType(hexActions.validateHex),
      switchMap(({payload: input}) => of(this.hexService.removeHash(input))
        .pipe(
          map((response) => {
            if (this.hexService.isStandardHexLength(response) || this.hexService.isTransparentLength(response)) {
              return this.hexService.hasValidHexCharacters(response) ?
               hexActions.validateHexSuccess({payload: response}) :
               hexActions.validateHexFailure({payload: 'invalid characters found!'}); 
            } else {
              return hexActions.validateHexFailure({payload: 'incorrect hexadecimal length!'});
            }
          })        
        )
      )));

    calculateRgbType$ = createEffect(() => this.actions$
      .pipe(
        ofType(hexActions.calulateRgbType),
        switchMap(({ payload: input }) => of(this.hexService.getRgbType(input))
          .pipe(
            map((response) => hexActions.calulateRgbTypeResult({payload: response}))
          ))
      ));

    calculateRgbValue$ = createEffect(() => this.actions$
      .pipe(
        ofType(hexActions.calculateRgbFromHexadecimal),
        switchMap(({payload: input}) => of(this.hexService.getRgbValues(input))
          .pipe(
            map((response) => hexActions.calculateRgbFromHexadecimalSuccess({payload: response})),                        
            catchError((error) => of(hexActions.calculateRgbFromHexadecimalFailed({payload: error})))
          ))            
      ));  
}