import { MeasuredIngredient, buildMeasuredIngredient } from "../ingredients";
import {
  Gram,
  Milligram,
  Ounce,
  Kilogram,
  Pound,
  Litre,
  Millilitre,
  Pint,
  Fahrenheit,
  Celsius,
  Teaspoon,
  Tablespoon,
  FluidOunce,
  Cup,
  Gallon,
  UnitMap
} from "../measurement/units";
import { buildMeasurement } from "../measurement/measurement";

export interface ParsedIngredient extends MeasuredIngredient {
  original: string;
}

const allUnits = [
  Gram,
  Milligram,
  Kilogram,
  Pound,
  Ounce,
  Litre,
  Millilitre,
  Pint,
  Teaspoon,
  Tablespoon,
  FluidOunce,
  Cup,
  Pint,
  Gallon,
  Fahrenheit,
  Celsius
];

const unitMap = allUnits.reduce(
  (map, measurement) => {
    map[measurement.symbol.toLowerCase()] = measurement;
    map[measurement.name.plural.toLowerCase()] = measurement;
    map[measurement.name.singular.toLowerCase()] = measurement;
    return map;
  },
  {} as UnitMap
);

export function parseIngredient(original: string): ParsedIngredient {
  const matches = /(\d+)\s?(\w+)(\sof)?(.+)/.exec(original);
  if (!matches) {
    return null;
  }
  const unit = unitMap[matches[2].toLowerCase()];
  const value = Number(matches[1]);
  const measurement = buildMeasurement(unit, value);
  return {
    original,
    ...buildMeasuredIngredient(matches[4].trim(), measurement)
  };
}

export function parseIngredients(
  originals: Array<string>
): Array<ParsedIngredient> {
  return originals.map(parseIngredient);
}
