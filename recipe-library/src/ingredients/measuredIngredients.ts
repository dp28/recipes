import { MeasuredIngredient } from "./ingredient";

export type IngredientList = Array<MeasuredIngredient>;

export interface IngredientMap {
  [substance: string]: MeasuredIngredient;
}

export type Ingredients = IngredientList | IngredientMap;

export function toIngredientMap(ingredients: Ingredients): IngredientMap {
  if (isIngredientList(ingredients)) {
    return buildIngredientMap(ingredients);
  } else {
    return ingredients;
  }
}

export function addIngredient(
  map: IngredientMap,
  ingredient: MeasuredIngredient
): IngredientMap {
  map[ingredient.substance] = ingredient;
  return map;
}

function isIngredientList(
  ingredients: Ingredients
): ingredients is IngredientList {
  return ingredients instanceof Array;
}

export function toIngredientList(ingredients: Ingredients): IngredientList {
  return isIngredientList(ingredients)
    ? ingredients
    : Object.values(ingredients);
}

export function buildIngredientMap(
  ingredients: Array<MeasuredIngredient>
): IngredientMap {
  return ingredients.reduce(addIngredient, {});
}
