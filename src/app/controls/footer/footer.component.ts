import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Rgba } from 'src/app/models/rgba.model';
import { AppState } from 'src/app/reducers';
import * as hexSelectors from '../../selectors/hex.selector';
import * as imageSelectors from '../../selectors/image.selector';
import * as imageActions from '../../actions/image.actions';
import { AppLink } from 'src/app/models/app-link.model';
import * as linkActions from '../../actions/app-link.actions';
import * as linkSelectors from '../../selectors/app-link.selector';
import { AppLinkService } from 'src/app/services/app-link.service';
import * as themeSelectors from '../../selectors/theme.selector';
import { Theme } from 'src/app/models/theme.enum';
import { AppLogo } from 'src/app/models/app-logo.model';

@Component({
  selector: 'cp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  rgbValue$: Observable<number[]>;
  rgba$: Observable<Rgba>;
  opacity$: Observable<number>;
  appLinks$: Observable<AppLink[]>;
  appLinksLoaded$: Observable<boolean>;
  theme$: Observable<Theme>;
  
  rgbaSubscription: Subscription;
  appLinksLoadedSubscription: Subscription;

  links: AppLink[];

  constructor(private store: Store<AppState>,
    private appLinkService: AppLinkService) { }

  ngOnInit(): void {
    this.rgbValue$ = this.store.select(hexSelectors.selectRgbValue);
    this.rgba$ = this.store.select(hexSelectors.selectRgba);
    this.opacity$ = this.store.select(imageSelectors.selectOpacity);
    this.appLinks$ = this.store.select(linkSelectors.selectAppLinks);
    this.appLinksLoaded$ = this.store.select(linkSelectors.selectLoaded);
    this.theme$ = this.store.select(themeSelectors.selectTheme);

    this.rgbaSubscription = this.rgba$.subscribe(rgba => {
      if (rgba) {
        this.store.dispatch(imageActions.calculateOpacity({ payload: rgba }));
      }
    });

    this.appLinksLoadedSubscription = this.appLinksLoaded$.subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(linkActions.getAppLinks());
      }
    });

    this.appLinks$.subscribe(x => {
      this.links = Array.from(x);
    });
  }

  getFriendlyRgba = (rgba: Rgba): string =>
    `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`;

  getLogoUrl = (logo: AppLogo, theme: Theme | undefined | null): string => 
    theme === Theme.Light || theme === undefined || theme === null ? logo.lightUrl : logo.darkUrl;
  
  ngOnDestroy(): void {
    if (this.rgbaSubscription) {
      this.rgbaSubscription.unsubscribe();
    }

    if (this.appLinksLoadedSubscription) {
      this.appLinksLoadedSubscription.unsubscribe();
    }
  }
}
