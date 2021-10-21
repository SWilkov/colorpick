import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Rgba } from 'src/app/models/rgba.model';
import { AppState } from 'src/app/reducers';
import * as hexSelectors from '../../selectors/hex.selector';
import * as imageSelectors from '../../selectors/image.selector';
import * as imageActions from '../../actions/image.actions';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as balloonSelectors from '../../selectors/balloon.selector';
import { Theme } from 'src/app/models/theme.enum';
import * as themeSelectors from '../../selectors/theme.selector';
@Component({
  selector: 'cp-balloon',
  animations: [ 
    trigger('fadeInFadeOut', [
      state('fadeIn', style({
        fillOpacity: 1        
      })),
      state('fadeOut', style({
        fillOpacity: 0
      })),
      transition('fadeIn => fadeOut', [
        animate('3s')
      ]),
      transition('fadeOut => fadeIn', [
        animate('3s')
      ])
    ])
  ],
  templateUrl: './balloon.component.html',
  styleUrls: ['./balloon.component.scss']
})
export class BalloonComponent implements OnInit, OnDestroy {
  currentState = 'fadeIn';

  isRising$: Observable<boolean>;
  theme$: Observable<Theme>;
  rgbValue$: Observable<number[]>;
  rgba$: Observable<Rgba>;
  opacity$: Observable<number>;
  rgbaSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.rgbValue$ = this.store.select(hexSelectors.selectRgbValue);
    this.rgba$ = this.store.select(hexSelectors.selectRgba);
    this.isRising$ = this.store.select(balloonSelectors.selectIsRising);
    this.theme$ = this.store.select(themeSelectors.selectTheme); 
    this.opacity$ = this.store.select(imageSelectors.selectOpacity);

    this.rgbaSubscription = this.rgba$.subscribe(rgba => {
      if (rgba) {
        this.store.dispatch(imageActions.calculateOpacity({ payload: rgba }));
      }
    });
  }
  
  change(): void {
    this.currentState = this.currentState === 'fadeOut' ? 'fadeIn' : 'fadeOut';
  }

  getFriendlyRgba = (rgba: Rgba): string =>
    `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`;

  ngOnDestroy(): void {
    if (this.rgbaSubscription) {
      this.rgbaSubscription.unsubscribe();
    }
  }
}
