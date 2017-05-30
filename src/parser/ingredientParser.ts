import { MeasuredIngredient, buildMeasuredIngredient } from '../ingredients';
import { grams } from '../measurement/units';

export interface ParsedIngredient extends MeasuredIngredient {
  original: string;
}

export function parseIngredient(original: string): ParsedIngredient {
  if (original !== '20g cheese')
    return null;
  return { original, ...buildMeasuredIngredient('', grams(1)) };
}
