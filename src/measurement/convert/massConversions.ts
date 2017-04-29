import { Gram, Ounce, Pound, Kilogram, Milligram } from '../units';
import { conversionRatio, Conversion } from './convert';

export const conversions: Conversion[] = [
  conversionRatio(1000, Gram, Kilogram),
  conversionRatio(1000, Milligram, Gram),
  conversionRatio(16, Ounce, Pound),
  conversionRatio(453.59237, Gram, Pound),
];
