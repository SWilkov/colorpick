import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { Hexadecimal } from '../models/hexadecimal.model';
import { RgbType } from '../models/rgb-type.model';

import { HexService } from './hex.service';

describe('HexService', () => {
  let service: HexService;

  beforeEach(() => {    
    TestBed.configureTestingModule({ providers: [HexService] });
    service = TestBed.inject(HexService);
  });

  it('should be created', () => {
    //service = TestBed.inject(HexService);
    expect(service).toBeTruthy();
  });

  //#region Rgb tests
  it('6 characters Rgb type returned', () => {
    expect(service.getRgbType('FFFFFF')).toEqual(RgbType.rgb);
  });

  it('8 characters Rgba (transparent) type returned', () => {
    expect(service.getRgbType('FFFFFFFF')).toEqual(RgbType.rgba);
  });

  it('10 characters invalid type returned', () => {
    expect(service.getRgbType('FFFFFFAAFF')).toEqual(RgbType.invalid);
  });
  //#endregion

  //#region Valid Hexadecimal character tests
  it('AB00FF is valid hexadecimal', () => {
    expect(service.hasValidHexCharacters('AB00FF')).toBeTruthy();
  });

  it('AB99FQ is invalid hexadecimal', () => {
    expect(service.hasValidHexCharacters('AB99FQ')).toBeFalsy();
  });

  it('+990 is invalid hexadecimal', () => {
    expect(service.hasValidHexCharacters('+990')).toBeFalsy();
  });
  //#endregion

  //#region hash tests
  it('#FFFFFF starts with #', () => {
    expect(service.startsWithHash('#FFFFFF')).toBeTruthy();
  });

  it('##FFFFFF starts with #', () => {
    expect(service.startsWithHash('##FFFFFF')).toBeTruthy();
  });

  it(' #FFFFFF starts with #', () => {
    expect(service.startsWithHash(' #FFFFFF')).toBeTruthy();
  });

  it('FFFFFF doesnt start with #', () => {
    expect(service.startsWithHash('FFFFFF')).toBeFalsy();
  });

  it('  FFFFFF doesnt start with #', () => {
    expect(service.startsWithHash('  FFFFFF')).toBeFalsy();
  });
  // //#endregion

  // //#region remove hash
  it('remove single hash #FFFFFF', () => {
    expect(service.removeHash('#FFFFFF')).toEqual('FFFFFF');
  });

  it('remove treble hash ###FFFFFF', () => {
    expect(service.removeHash('###FFFFFF')).toEqual('FFFFFF');
  });

  it('remove single hash with space #FFFFFF', () => {
    expect(service.removeHash(' #FFFFFF')).toEqual('FFFFFF');
  });

  it('remove single hash with 2 spaces # FFFFFF', () => {
    expect(service.removeHash(' # FFFFFF')).toEqual('FFFFFF');
  });
  //#endregion 

  //#region getCountdownSteps tests
  it('empty string[] return 0', () => {
    expect(service.getCountdownSteps([])).toEqual(0);
  });

  it('ABC returns 2 countdown steps', () => {
    expect(service.getCountdownSteps(['A', 'B', 'C'])).toEqual(2);
  });

  it('AB returns 1 countdown step', () => {
    expect(service.getCountdownSteps(['A', 'B'])).toEqual(1);
  });
  //#endregion

  //#region getHexidecimal
  it('A returns correct symbol & value', () => {
    let hex = service.getHexadecimal('A');
    expect(hex?.symbol).toEqual('A');
    expect(hex?.value).toEqual(10);
  });
  
  it('F returns correct symbol & value', () => {
    let hex = service.getHexadecimal('F');
    expect(hex?.symbol).toEqual('F');
    expect(hex?.value).toEqual(15);
  });

  it('FF returns incorrect symbol & value undefined', () => {
    let hex = service.getHexadecimal('FF');
    expect(hex).toEqual(undefined);
  });
  //#endregion

  //#region hexBySixteenCalc tests
  it('multiplier is 0 return value of hexadecimal: 15', () => {
    let hex: Hexadecimal = { symbol: 'F', value: 15 };

    expect(service.hexBySixteenCalc(hex, 0)).toEqual(15);
  });

  it('multiplier is 1, hex is F return 240', () => {
    let hex: Hexadecimal = { symbol: 'F', value: 15 };

    expect(service.hexBySixteenCalc(hex, 1)).toEqual(240);
  });

  it('multiplier is 2 return value of hexadecimal: 3840', () => {
    let hex: Hexadecimal = { symbol: 'F', value: 15 };

    expect(service.hexBySixteenCalc(hex, 2)).toEqual(3840);
  });

  it('multiplier is 3 return value of hexadecimal: 61440', () => {
    let hex: Hexadecimal = { symbol: 'F', value: 15 };

    expect(service.hexBySixteenCalc(hex, 3)).toEqual(61440);
  });
  //#endregion

  //#region getHexadecimalNumberValues tests
  it('FF should return [240,15] array', () => {
    let val = service.getHexadecimalNumberValues('FF');
    expect(val).toEqual([240, 15]);
  });

  it('FFF should return [3840,240,15] array', () => {
    let val = service.getHexadecimalNumberValues('FFF');
    expect(val).toEqual([3840, 240, 15]);
  });

  it('C9 should return [192,9] array', () => {
    let val = service.getHexadecimalNumberValues('C9');
    expect(val).toEqual([192, 9]);
  });
  //#endregion

  //#region getRgbValues tests
  it('FFFFFF returns correct multi array', () => {
    let res = service.getRgbValues('FFFFFF');
    expect(res).toEqual([[240, 15], [240, 15], [240, 15]]);
  });

  it('FFFFFFCE returns correct multi array', () => {
    let res = service.getRgbValues('FFFFFFCE');
    expect(res).toEqual([[240, 15], [240, 15], [240, 15], [192, 14]]);
  });

  it('AE09BB54 returns correct multi array', () => {
    let res = service.getRgbValues('AE09BB54');
    expect(res).toEqual([[160, 14], [0, 9], [176, 11], [80, 4]]);
  });
  //#endregion
});
