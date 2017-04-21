import { Gram, Ounce, Pound, Kilogram, Milligram, Unit } from '../units';
import { Conversion } from './convert';

export const conversions: Conversion[] = [
  ratio(1000, Gram, Kilogram),
  ratio(1000, Milligram, Gram),
  ratio(16, Ounce, Pound),
  ratio(453.59237, Gram, Pound),
];

function ratio(ratioToOne: number, to: Unit, from: Unit): Conversion {
  return {
    from: from.symbol,
    to: to.symbol,
    changes: [{ type: 'multiply', value: ratioToOne }]
  };
}
