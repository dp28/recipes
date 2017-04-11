import { Measurement } from './measurement';

export interface ScaleOverrides {
  [unit: string]: ScaleOverride;
}

export interface ScaleOverride {
  scale?: (value: number, factor: number) => number
}

function multiply(value: number, factor: number): number {
  return value * factor;
}

export function scale(measurement: Measurement, factor: number, overrides: ScaleOverrides = {}) {
  const override = overrides[measurement.unit] || {};
  const apply = override.scale || multiply;
  return { ...measurement, value: apply(measurement.value, factor) };
}
