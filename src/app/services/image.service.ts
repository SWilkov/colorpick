import { Injectable } from '@angular/core';
import { Rgba } from '../models/rgba.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  getOpacityFromAlpha(rgba: Rgba): number {    
    let opacity = 1 - (255 - rgba.alpha) / 255;
    return +opacity.toFixed(2);
  }  
}
