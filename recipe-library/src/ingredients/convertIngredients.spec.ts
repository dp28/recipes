import { expect } from "chai";
import "mocha";

import { convertRelevantIngredients } from "./convertIngredients";
import { toIngredientMap } from "./measuredIngredients";
import { buildMeasuredIngredient } from "./ingredient";
import { grams, ounces, cups, pounds, Pound } from "../measurement/units";

const ingredients = [
  buildMeasuredIngredient("flour", grams(453.59237 * 2)),
  buildMeasuredIngredient("cocoa", grams(453.59237)),
  buildMeasuredIngredient("butter", ounces(2)),
  buildMeasuredIngredient("salt", pounds(2)),
  buildMeasuredIngredient("milk", cups(3))
];

const ingredientsMap = toIngredientMap(ingredients);

describe("convertRelevantIngredients", () => {
  it("should convert only the measurements that can be converted", () => {
    const convertedIngredientsMap = convertRelevantIngredients(
      Pound,
      ingredients
    );
    expect(convertedIngredientsMap).to.eql(
      toIngredientMap([
        buildMeasuredIngredient("flour", pounds(2)),
        buildMeasuredIngredient("cocoa", pounds(1)),
        buildMeasuredIngredient("butter", pounds(2 / 16)),
        buildMeasuredIngredient("salt", pounds(2)),
        buildMeasuredIngredient("milk", cups(3))
      ])
    );
  });
});
