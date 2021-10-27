import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/models/theme.enum';
import { AppState } from 'src/app/reducers';
import * as themeSelectors from '../../selectors/theme.selector';

@Component({
  selector: 'cp-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  theme$: Observable<Theme>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.theme$ = this.store.select(themeSelectors.selectTheme);
  }

}
