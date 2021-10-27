import { Hexadecimal } from "../models/hexadecimal.model";

export const hexidecimals: Hexadecimal[] = [
  { symbol: '0', value: 0, binaryValue: '0000' },
  { symbol: '1', value: 1, binaryValue: '0001' },
  { symbol: '2', value: 2, binaryValue: '0010' },
  { symbol: '3', value: 3, binaryValue: '0011' },
  { symbol: '4', value: 4, binaryValue: '0100' },
  { symbol: '5', value: 5, binaryValue: '0101' },
  { symbol: '6', value: 6, binaryValue: '0110' },
  { symbol: '7', value: 7, binaryValue: '0111' },
  { symbol: '8', value: 8, binaryValue: '1000' },
  { symbol: '9', value: 9, binaryValue: '1001' },
  { symbol: 'A', value: 10, binaryValue: '1010' },
  { symbol: 'B', value: 11, binaryValue: '1011' },
  { symbol: 'C', value: 12, binaryValue: '1100' },
  { symbol: 'D', value: 13, binaryValue: '1101' },
  { symbol: 'E', value: 14, binaryValue: '1110' },
  { symbol: 'F', value: 15, binaryValue: '1111' }
];

export const HEX_STANDARD_COLOR_LENGTH: number = 6;
export const HEX_TRANSPARENT_COLOR_LENGTH: number = 8; //with transparency
export const HEX_TO_RGB_SPLIT_SIZE = 2; //when converting to rgb(a) hexadecimal is split into groups of 2 characters
export const HEX_MULTIPLIER = 16; //Hexadecimal is based on multiples of 16

export const validHexCharacters: string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];
