import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/models/theme.enum';
import { AppState } from 'src/app/reducers';
import * as themeSelectors from '../../selectors/theme.selector';

@Component({
  selector: 'cp-clear-button',
  templateUrl: './clear-button.component.html',
  styleUrls: ['./clear-button.component.scss']
})
export class ClearButtonComponent implements OnInit {
  @Output() clearEvent: EventEmitter<any> = new EventEmitter<any>();
  theme$: Observable<Theme>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.theme$ = this.store.select(themeSelectors.selectTheme);
  }

  clear(): void {
    this.clearEvent.emit();
  }
}
