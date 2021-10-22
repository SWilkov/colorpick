import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Rgba } from 'src/app/models/rgba.model';
import { Theme } from 'src/app/models/theme.enum';
import { AppState } from 'src/app/reducers';
import * as themeSelectors from '../../selectors/theme.selector';

@Component({
  selector: 'cp-rgba-viewer',
  templateUrl: './rgba-viewer.component.html',
  styleUrls: ['./rgba-viewer.component.scss']
})
export class RgbaViewerComponent implements OnInit {
  @Input() rgba: Rgba;

  theme$: Observable<Theme>;
   
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.theme$ = this.store.select(themeSelectors.selectTheme);
  }

}
