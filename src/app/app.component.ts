import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as hexActions from './actions/hex.actions';
import { Rgba } from './models/rgba.model';
import { AppState } from './reducers';
import * as hexSelectors from './selectors/hex.selector';
import * as imageSelectors from './selectors/image.selector';
import * as imageActions from './actions/image.actions';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as balloonSelectors from './selectors/balloon.selector';
import * as balloonActions from './actions/balloon.actions';
import * as themeSelectors from './selectors/theme.selector';
import { Theme } from './models/theme.enum';
@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'colorpick';
  theme$: Observable<Theme>;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.theme$ = this.store.select(themeSelectors.selectTheme);
  }  
  
  ngOnDestroy(): void {
    
  }
}
