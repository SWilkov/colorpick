import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
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

  // //#region Rgb tests
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

  // //#region hash tests
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
});
