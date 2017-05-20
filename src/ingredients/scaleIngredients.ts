import { scale, Measurement } from '../measurement';
import { Ingredients, IngredientMap, toIngredientMap, buildIngredientMap } from './measuredIngredients';
import { MeasuredIngredient } from './ingredient';

export function scaleIngredientsByFactor(factor: number, ingredients: Ingredients): IngredientMap {
  const ingredientMap = toIngredientMap(ingredients);
  return mapValues(scaleIngredient(factor), ingredientMap);
}

export function scaleIngredientsByIngredient(
  ingredient: MeasuredIngredient,
  ingredients: Ingredients
): IngredientMap {
  const ingredientMap = toIngredientMap(ingredients);
  const oldIngredient = ingredientMap[ingredient.substance];
  if (oldIngredient) {
    const ratio = calculateRatioBetween(ingredient.measurement, oldIngredient.measurement);
    return scaleIngredientsByFactor(ratio, ingredientMap);
  }
  return ingredientMap;
}

function calculateRatioBetween(first: Measurement, second: Measurement): number {
  if (first.unit !== second.unit) {
    throw 'Conversion between units during scaling is not supported';
  }
  return first.value / second.value;
}

function scaleIngredient(factor: number): (ingredient: MeasuredIngredient) => MeasuredIngredient {
  return ingredient => ({ ...ingredient, measurement: scale(ingredient.measurement, factor) });
}

function mapValues<T, U>(func: (t: T) => U, object: { [_:string]: T }): { [_:string]: U } {
  return Object.keys(object).reduce((mapped: { [_:string]: U }, key) => {
      mapped[key] = func(object[key]);
      return mapped;
    }, {});
}
