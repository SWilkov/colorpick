import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Rgba } from 'src/app/models/rgba.model';
import { AppState } from 'src/app/reducers';
import * as hexSelectors from '../../selectors/hex.selector';
import * as imageSelectors from '../../selectors/image.selector';
import * as imageActions from '../../actions/image.actions';

@Component({
  selector: 'cp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  rgbValue$: Observable<number[]>;
  rgba$: Observable<Rgba>;
  opacity$: Observable<number>;

  rgbaSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.rgbValue$ = this.store.select(hexSelectors.selectRgbValue);
    this.rgba$ = this.store.select(hexSelectors.selectRgba);
    this.opacity$ = this.store.select(imageSelectors.selectOpacity);

    this.rgbaSubscription = this.rgba$.subscribe(rgba => {
      if (rgba) {
        this.store.dispatch(imageActions.calculateOpacity({ payload: rgba }));
      }
    });
  }

  getFriendlyRgba = (rgba: Rgba): string =>
    `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`;

  ngOnDestroy(): void {
    if (this.rgbaSubscription) {
      this.rgbaSubscription.unsubscribe();
    }
  }
}
