import { scale } from '../measurement';
import { Ingredients, IngredientMap, toIngredientMap, buildIngredientMap } from './measuredIngredients';
import { MeasuredIngredient } from './ingredient';

export function scaleIngredientsByFactor(factor: number, ingredients: Ingredients): IngredientMap {
  const ingredientMap = toIngredientMap(ingredients);
  return mapValues(scaleIngredient(factor), ingredientMap);
}

function mapValues<T, U>(func: (t: T) => U, object: { [_:string]: T }): { [_:string]: U } {
  return Object
    .keys(object)
    .reduce((mapped: { [_:string]: U }, key) => {
      mapped[key] = func(object[key]);
      return mapped;
    }, {});
}

function scaleIngredient(factor: number): (ingredient: MeasuredIngredient) => MeasuredIngredient {
  return ingredient => ({ ...ingredient, measurement: scale(ingredient.measurement, factor) });
}
