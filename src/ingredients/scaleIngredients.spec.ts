import { expect } from 'chai';
import 'mocha';

import { scaleIngredientsByFactor } from './scaleIngredients';
import { IngredientList } from './measuredIngredients';
import { buildMeasuredIngredient } from './ingredient';
import { grams, litres } from '../measurement/units';

const ingredients = [
  buildMeasuredIngredient('flour', grams(500)),
  buildMeasuredIngredient('butter', grams(400)),
  buildMeasuredIngredient('milk', grams(300)),
];

describe('scaleIngredientsByFactor', () => {
  it('should multiply the measurements of all ingredients by the factor', () => {
    const scaledIngredientsMap = scaleIngredientsByFactor(2, ingredients);
    ingredients.forEach(ingredient => {
      const scaled = scaledIngredientsMap[ingredient.substance];
      expect(scaled.measurement.value).to.equal(2 * ingredient.measurement.value);
    });
  });
});
