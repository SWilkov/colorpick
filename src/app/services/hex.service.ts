import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as hexDomain from '../data/hexadecimal.domain';
import { RgbType } from '../models/rgb-type.model';

const HEX_STANDARD_COLOR_LENGTH: number = 6; 
const HEX_TRANSPARENT_COLOR_LENGTH: number = 8;

@Injectable({
  providedIn: 'root'
})
export class HexService {

  constructor() { }

  startsWithHash(input: string): boolean {
    return input.trim().startsWith('#');
  }

  removeHash(input: string): string {
    let output = this.startsWithHash(input.trim()) ? 
                    input.trim().substring(1, input.length).trim() :
                    input.trim();

    return this.startsWithHash(output) ? this.removeHash(output) : output;
  }
  
  getRgbType(input: string): RgbType {
    
    switch (input.length) {
      case hexDomain.HEX_STANDARD_COLOR_LENGTH:
        return RgbType.rgb;
      case hexDomain.HEX_TRANSPARENT_COLOR_LENGTH:
        return RgbType.rgba;
      default:
        return RgbType.invalid;
    }
  }

  hasValidHexCharacters(input: string): boolean {
    var chunks = Array.from(input);

    var valid = chunks.map(x => hexDomain.validHexCharacters.findIndex(h => x.toUpperCase() === h));
    return !valid.includes(-1);
  }
  
  isStandardHexLength(input: string): boolean {
    return input.trim().length === hexDomain.HEX_STANDARD_COLOR_LENGTH;
  }

  isTransparentLength(input: string): boolean {
    return input.trim().length === hexDomain.HEX_TRANSPARENT_COLOR_LENGTH;
  }

  
}
