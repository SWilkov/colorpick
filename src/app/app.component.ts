import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as hexActions from './actions/hex.actions';
import { Rgba } from './models/rgba.model';
import { AppState } from './reducers';
import * as hexSelectors from './selectors/hex.selector';
import * as imageSelectors from './selectors/image.selector';
import * as imageActions from './actions/image.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'colorpick';
  rgba$: Observable<Rgba>;
  opacity$: Observable<number>;
  validatedHex$: Observable<string>;

  rgbaSubscription: Subscription;
  validatedHexSubscription: Subscription;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.rgba$ = this.store.select(hexSelectors.selectRgba);
    this.opacity$ = this.store.select(imageSelectors.selectOpacity);
    this.validatedHex$ = this.store.select(hexSelectors.selectValidatedHexadecimal);

    this.rgbaSubscription = this.rgba$.subscribe(rgba => {
      if (rgba) {
        this.store.dispatch(imageActions.calculateOpacity({ payload: rgba }));
      }
    });

    this.validatedHexSubscription = this.validatedHex$.subscribe(hex => {
      if (hex) {
        console.log(hex);
        this.store.dispatch(hexActions.calculateRgbFromHexadecimal({payload: hex}));
      }
    });
  }

  onHexadecimalChanged(text: string): void {    
    this.store.dispatch(hexActions.validateHex({payload: text}));
    //this.store.dispatch(hexActions.calculateRgbFromHexadecimal({payload: text}));
  }

  getFriendlyRgba(rgba: Rgba): string {
    return `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`;
  }
  
  ngOnDestroy(): void {
    if (this.rgbaSubscription) {
      this.rgbaSubscription.unsubscribe();
    }

    if (this.validatedHexSubscription) {
      this.validatedHexSubscription.unsubscribe();
    }
  }
}
