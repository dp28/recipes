import { Unit } from './unit';
import { Quantity } from '../quantity';

export const Gram = buildMassUnit(`g`, `gram`);
export const Kilogram = buildMassUnit(`kg`, `kilogram`);
export const Milligram = buildMassUnit(`mg`, `milligram`);

export const Ounce = buildMassUnit(`oz`, `ounce`);
export const Pound = buildMassUnit(`lb`, `pound`);

function buildMassUnit(symbol: string, name: string): Unit {
  return {
    symbol,
    quantity: Quantity.Mass,
    name: {
      singular: name,
      plural: `${name}s`
    }
  }
}
