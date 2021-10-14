import { Hexadecimal } from "../models/hexadecimal.model";

export const hexidecimals: Hexadecimal[] = [
  { symbol: '0', value: 0 },
  { symbol: '1', value: 1 },
  { symbol: '2', value: 2 },
  { symbol: '3', value: 3 },
  { symbol: '4', value: 4 },
  { symbol: '5', value: 5 },
  { symbol: '6', value: 6 },
  { symbol: '7', value: 7 },
  { symbol: '8', value: 8 },
  { symbol: '9', value: 9 },
  { symbol: 'A', value: 10 },
  { symbol: 'B', value: 11 },
  { symbol: 'C', value: 12 },
  { symbol: 'D', value: 13 },
  { symbol: 'E', value: 14 },
  { symbol: 'F', value: 15 }
];

export const HEX_STANDARD_COLOR_LENGTH: number = 6;
export const HEX_TRANSPARENT_COLOR_LENGTH: number = 8; //with transparency

export const validHexCharacters: string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];
