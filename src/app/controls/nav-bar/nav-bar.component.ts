import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Rgba } from 'src/app/models/rgba.model';
import { Theme } from 'src/app/models/theme.enum';
import { AppState } from 'src/app/reducers';
import * as hexSelectors from '../../selectors/hex.selector';
import * as imageSelectors from '../../selectors/image.selector';
import * as themeSelectors from '../../selectors/theme.selector';
import * as navigationSelectors from '../../selectors/navigation.selector';
import { Page } from 'src/app/models/page.enum';

@Component({
  selector: 'cp-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  rgba$: Observable<Rgba>;
  opacity$: Observable<number>;
  theme$: Observable<Theme>;
  currentPage$: Observable<Page>;
  rgbaSubscription: Subscription;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { 
    this.rgba$ = this.store.select(hexSelectors.selectRgba);
    this.opacity$ = this.store.select(imageSelectors.selectOpacity);
    this.theme$ = this.store.select(themeSelectors.selectTheme);
    this.currentPage$ = this.store.select(navigationSelectors.selectCurrentPage);
  }

  getFriendlyRgba = (rgba: Rgba): string =>
    `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`;
}
