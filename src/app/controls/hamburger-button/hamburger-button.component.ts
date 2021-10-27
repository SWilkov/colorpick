import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/models/theme.enum';
import { AppState } from 'src/app/reducers';
import { MenuState } from 'src/app/reducers/hamburger.reducer';
import * as hbActions from '../../actions/hamburger.actions';
import * as hbSelectors from '../../selectors/hamburger.selector';
import * as themeSelectors from '../../selectors/theme.selector';

@Component({
  selector: 'cp-hamburger-button',
  templateUrl: './hamburger-button.component.html',
  styleUrls: ['./hamburger-button.component.scss']
})
export class HamburgerButtonComponent implements OnInit {
  visible$: Observable<boolean>;
  state$: Observable<MenuState>;
  theme$: Observable<Theme>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.visible$ = this.store.select(hbSelectors.selectHamburgerMenuVisible);
    this.state$ = this.store.select(hbSelectors.selectHamburgerMenuState);
    this.theme$ = this.store.select(themeSelectors.selectTheme);
  }

  toggle(): void {
    this.store.dispatch(hbActions.toggleMenu());
  }
}
