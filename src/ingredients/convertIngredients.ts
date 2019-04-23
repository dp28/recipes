import { Unit } from "../measurement/units";
import {
  Ingredients,
  IngredientMap,
  toIngredientList,
  MeasuredIngredient,
  addIngredient,
  toIngredientMap
} from ".";
import { convert } from "../measurement/convert";

export function convertRelevantIngredients(
  unit: Unit,
  ingredients: Ingredients
): IngredientMap {
  return toIngredientMap(
    toIngredientList(ingredients).map(ingredient =>
      convertIngredient(ingredient, unit)
    )
  );
}

function convertIngredient(ingredient: MeasuredIngredient, unit: Unit) {
  try {
    const measurement = convert(ingredient.measurement, unit);
    return { ...ingredient, measurement };
  } catch {
    return ingredient;
  }
}
