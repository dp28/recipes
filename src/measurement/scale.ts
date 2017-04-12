import { Measurement } from './measurement';
import { UnitMap } from './units';

export function scale(measurement: Measurement, factor: number, unitMap: UnitMap = {}) {
  const unit = unitMap[measurement.unit];
  const scaled = measurement.value * factor;
  const value = (unit && unit.minimumStep) ? ceilToNearest(scaled, unit.minimumStep) : scaled;
  return { ...measurement, value };
}

function ceilToNearest(number: number, minimumStep: number): number {
  return Math.ceil(number / minimumStep) * minimumStep;
}
