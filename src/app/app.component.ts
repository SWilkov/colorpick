import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
import { MenuState } from './reducers/hamburger.reducer';
import * as hbSelectors from './selectors/hamburger.selector';
@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  
})
export class AppComponent implements OnInit, AfterContentInit, OnDestroy {
  title = 'colorpick';
  theme$: Observable<Theme>;
  menuState$: Observable<MenuState>;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.theme$ = this.store.select(themeSelectors.selectTheme);
    this.menuState$ = this.store.select(hbSelectors.selectHamburgerMenuState);
  }
  
  ngAfterContentInit(): void {
   
  }
  
  ngOnDestroy(): void {
    
  }
}
