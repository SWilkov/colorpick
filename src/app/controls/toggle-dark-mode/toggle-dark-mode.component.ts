import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as themeActions from '../../actions/theme.actions';

@Component({
  selector: 'cp-toggle-dark-mode',
  templateUrl: './toggle-dark-mode.component.html',
  styleUrls: ['./toggle-dark-mode.component.scss']
})
export class ToggleDarkModeComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.store.dispatch(themeActions.toggleTheme());
  }
}
