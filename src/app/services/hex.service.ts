import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as hexDomain from '../data/hexadecimal.domain';
import { Hexadecimal } from '../models/hexadecimal.model';
import { RgbType } from '../models/rgb-type.model';
import { hexadecimalReducer } from '../reducers/hex.reducer';

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

  getHexadecimalNumberValues = (input: string): number[] => {
    let result: number[] = [];

    //Convert Hex string to Array
    let array = Array.from(input);

    let countdownSteps: number = this.getCountdownSteps(array);

    for(var i = 0; i < array.length; i++) {
      let hex = this.getHexadecimal(array[i]);

      if (hex) {
        result.push(this.hexBySixteenCalc(hex, countdownSteps));
        countdownSteps--;
      }
    }
    return result;
  }

  //Hexadecimal value is created using power of 16 on a sliding scale 
  //ie ABC = (16 squared) + (16 by 1) + (16 by 0)
  getCountdownSteps = (array: string[]): number => 
    array && array.length > 0 ? array.length - 1 : 0;

  getHexadecimal = (symbol: string): Hexadecimal | undefined => 
    hexDomain.hexidecimals.some(x => x.symbol === symbol.toUpperCase()) ?
    hexDomain.hexidecimals.find(x => x.symbol === symbol.toUpperCase()) :
    undefined;

  hexBySixteenCalc = (hexadecimal: Hexadecimal, multiplier: number) => 
    multiplier > 0 ? 
      (hexadecimal.value * Math.pow(hexDomain.HEX_MULTIPLIER, multiplier)) :
      hexadecimal.value;
    
  rgbSplitter = (input: string): string[] => {
    var chunks: string[] = [];
    
    for(var i = 0; i < input.length; i += hexDomain.HEX_TO_RGB_SPLIT_SIZE) {
      chunks.push(input.substring(i, i + hexDomain.HEX_TO_RGB_SPLIT_SIZE)); 
    }
    return chunks;
  };

  getRgbValues = (input: string): number[][] => {
    let rgbChunks = this.rgbSplitter(input);

    return rgbChunks.map(chunk => { 
      return this.getHexadecimalNumberValues(chunk)
    });
  }
}
