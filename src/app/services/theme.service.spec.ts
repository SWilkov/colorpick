import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Rgba } from '../models/rgba.model';
import { Theme } from '../models/theme.enum';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('rgba alpha is less than 20 return Dark', () => {
    let rgba: Rgba = {
      red: 200,
      green: 200,
      blue: 200,
      alpha: 15
    };

    expect(service.get(rgba)).toEqual(of(Theme.Dark));
  });

  it('rgba alpha is less than 20 return Dark', () => {
    let rgba: Rgba = {
      red: 220,
      green: 220,
      blue: 220,
      alpha: 105
    };
    
    expect(service.get(rgba)).toEqual(of(Theme.Dark));
  });

  it('rgba red is below 200 return Light', () => {
    let rgba: Rgba = {
      red: 22,
      green: 220,
      blue: 220,
      alpha: 150
    };
    
    expect(service.get(rgba)).toEqual(of(Theme.Light));
  });

  it('rgba red is below 200 and alpha is below 20 return Dark', () => {
    let rgba: Rgba = {
      red: 22,
      green: 220,
      blue: 220,
      alpha: 15
    };
    
    expect(service.get(rgba)).toEqual(of(Theme.Dark));
  });
});
