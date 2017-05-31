import { Unit, UnitRef } from './unit';
import { Quantity } from '../quantity';
import { buildMeasurementCurried, Measurement } from '../measurement';

export const Gram = buildMassUnit(`g`, `gram`);
export const Kilogram = buildMassUnit(`kg`, `kilogram`);
export const Milligram = buildMassUnit(`mg`, `milligram`);

export const Ounce = buildMassUnit(`oz`, `ounce`);
export const Pound = buildMassUnit(`lb`, `pound`);

export const grams = buildMeasurementCurried(Gram);
export const kilograms = buildMeasurementCurried(Kilogram);
export const milligrams = buildMeasurementCurried(Milligram);

export const ounces = buildMeasurementCurried(Ounce);
export const pounds = buildMeasurementCurried(Pound);

export const MassUnits = [
  Kilogram,
  Milligram,
  Gram,
  Ounce,
  Pound,
];

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
