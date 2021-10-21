import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Rgba } from '../models/rgba.model';
import { Theme } from '../models/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  get(rgba: Rgba): Observable<Theme> {
    if (rgba) {
      if (rgba.red > 200 && rgba.green > 200 && rgba.blue > 200 || rgba.alpha <= 20) {
        return of(Theme.Dark);
      } else {
        return of(Theme.Light);
      }
    }
    return of(Theme.Light);
  }
}
