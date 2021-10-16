import { TestBed } from '@angular/core/testing';
import { Rgba } from '../models/rgba.model';

import { ImageService } from './image.service';

describe('SvgService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('255 alpha returns 1.0', () => {
    let rgba: Rgba = { red: 245, green: 124, blue: 56, alpha: 255 };
    expect(service.getOpacityFromAlpha(rgba)).toBe(1);
  });

  it('125 alpha returns 1.0', () => {
    let rgba: Rgba = { red: 245, green: 124, blue: 56, alpha: 125 };
    expect(service.getOpacityFromAlpha(rgba)).toBe(0.49);
  });

  it('0 alpha returns 0', () => {
    let rgba: Rgba = { red: 245, green: 124, blue: 56, alpha: 0 };
    expect(service.getOpacityFromAlpha(rgba)).toBe(0);
  });
});
