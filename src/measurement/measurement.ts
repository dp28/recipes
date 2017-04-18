import { UnitRef, toUnitSymbol } from './units';

export interface Measurement {
  value: number;
  unit: string;
}

export function buildMeasurement(unitRef: UnitRef, value: number): Measurement {
  return { value, unit: toUnitSymbol(unitRef) };
}
