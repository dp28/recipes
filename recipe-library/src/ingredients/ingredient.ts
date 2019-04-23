import { Measurement } from "../measurement";

export interface MeasuredIngredient {
  substance: string;
  measurement: Measurement;
}

export function buildMeasuredIngredient(
  substance: string,
  measurement: Measurement
): MeasuredIngredient {
  return { substance, measurement };
}
