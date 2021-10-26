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
        let res = this.hexBySixteenCalc(hex, countdownSteps);
        if (res) {
          result.push(res);
        }
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
    
    symbol && hexDomain.hexidecimals.some(x => x.symbol === symbol.toUpperCase()) ?
    hexDomain.hexidecimals.find(x => x.symbol === symbol.toUpperCase()) :
    undefined;
  

  hexBySixteenCalc = (hexadecimal: Hexadecimal | undefined, multiplier: number) => 
    multiplier > 0 ? 
      (hexadecimal && hexadecimal.value * Math.pow(hexDomain.HEX_MULTIPLIER, multiplier)) :
      hexadecimal?.value;
    
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

  getDecimal = (input: string): number[] => {
    let arr = [...input];
    let hexs = arr.map(x => this.getHexadecimal(x));
    let countdownSteps = this.getCountdownSteps(arr);
    let result: number[] = [];

    for(var i = 0; i < hexs.length; i++)
    {
      let calculation = this.hexBySixteenCalc(hexs[i], countdownSteps);
      if (calculation) {
        result.push(calculation);
      } 
      countdownSteps--;
    }
    
    return result;
    // let result: number[] = [1,10];
    // return result;
  }

  sum(hexadecimals: number[][]): number[] {
    return hexadecimals.map(x => x.reduce((a, b) => a + b, 0));
  }

  
}
