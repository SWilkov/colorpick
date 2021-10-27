import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/models/theme.enum';
import { AppState } from 'src/app/reducers';
import * as themeActions from '../../actions/theme.actions';
import * as themeSelectors from '../../selectors/theme.selector';
@Component({
  selector: 'cp-toggle-dark-mode',
  templateUrl: './toggle-dark-mode.component.html',
  styleUrls: ['./toggle-dark-mode.component.scss']
})
export class ToggleDarkModeComponent implements OnInit {
  theme$: Observable<Theme>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.theme$ = this.store.select(themeSelectors.selectTheme);
  }

  toggle(): void {
    this.store.dispatch(themeActions.toggleTheme());
  }
}
