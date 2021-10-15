import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as hexActions from './actions/hex.actions';
import { Rgba } from './models/rgba.model';
import { AppState } from './reducers';
import * as hexSelectors from './selectors/hex.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'colorpick';
  rgba$: Observable<Rgba>;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.rgba$ = this.store.select(hexSelectors.selectRgba);
  }

  onHexadecimalChanged(text: string): void {    
    this.store.dispatch(hexActions.calculateRgbFromHexadecimal({payload: text}));
  }

  getFriendlyRgba(rgba: Rgba): string {
    return `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`;
  }
}
