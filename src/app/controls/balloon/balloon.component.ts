import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Rgba } from 'src/app/models/rgba.model';
import { AppState } from 'src/app/reducers';
import * as hexSelectors from '../../selectors/hex.selector';

@Component({
  selector: 'cp-balloon',
  templateUrl: './balloon.component.html',
  styleUrls: ['./balloon.component.scss']
})
export class BalloonComponent implements OnInit {
  rgbValue$: Observable<number[]>;
  rgba$: Observable<Rgba>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.rgbValue$ = this.store.select(hexSelectors.selectRgbValue);
    this.rgba$ = this.store.select(hexSelectors.selectRgba);
  }

  getFriendlyRgba = (rgba: Rgba): string =>
    `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`;
}