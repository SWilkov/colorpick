import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Rgba } from 'src/app/models/rgba.model';
import { AppState } from 'src/app/reducers';
import * as hexActions from '../../actions/hex.actions';
import * as hexSelectors from '../../selectors/hex.selector';
import * as imageSelectors from '../../selectors/image.selector';
import * as imageActions from '../../actions/image.actions';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppLink } from 'src/app/models/app-link.model';
import * as linkActions from '../../actions/app-link.actions';
import * as themeActions from '../../actions/theme.actions';
import { Theme } from 'src/app/models/theme.enum';
import * as themeSelectors from '../../selectors/theme.selector';
import * as balloonSelectors from '../../selectors/balloon.selector';
import * as balloonActions from '../../actions/balloon.actions';

@Component({
  selector: 'cp-hex-to-rgba',
  animations: [
    trigger('riseFall', [
      state('rise', style({
        bottom: 245,
        right: 25,
        opacity: 1
      })),
      state('fall', style({
        bottom: 50,
        right: 25,
        opacity: 0.25
      })),
      transition('fall => rise', [
        animate('3s')
      ]),
      transition('rise => fall', [
        animate('3s')
      ])
    ])
  ],
  templateUrl: './hex-to-rgba.component.html',
  styleUrls: ['./hex-to-rgba.component.scss']
})
export class HexToRgbaComponent implements OnInit, AfterViewInit, OnDestroy {
  rgba$: Observable<Rgba>;
  opacity$: Observable<number>;
  validatedHex$: Observable<string>;
  links$: Observable<AppLink[]>;
  theme$: Observable<Theme>;
  rgbaSubscription: Subscription;
  validatedHexSubscription: Subscription;

  //isRising: boolean = false;
  isRising$: Observable<boolean>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.rgba$ = this.store.select(hexSelectors.selectRgba);
    this.opacity$ = this.store.select(imageSelectors.selectOpacity);
    this.validatedHex$ = this.store.select(hexSelectors.selectValidatedHexadecimal);
    this.theme$ = this.store.select(themeSelectors.selectTheme);
    this.isRising$ = this.store.select(balloonSelectors.selectIsRising);

    this.rgbaSubscription = this.rgba$.subscribe(rgba => {
      if (rgba) {
        this.store.dispatch(imageActions.calculateOpacity({ payload: rgba })); 
        this.store.dispatch(themeActions.checkTheme({ payload: rgba }));      
      }
    });

    this.validatedHexSubscription = this.validatedHex$.subscribe(hex => {
      if (hex) {        
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

  toggle(): void {
    //this.isRising = !this.isRising;
    this.store.dispatch(balloonActions.toggle());
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   if (!this.isRising) {
    //     this.isRising = true;
    //   }
    // }, 500);

    setTimeout(() => {
      this.store.dispatch(balloonActions.toggle());
    }, 500);
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
