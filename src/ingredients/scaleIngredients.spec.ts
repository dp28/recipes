import { expect } from 'chai';
import 'mocha';

import { scaleIngredientsByFactor, scaleIngredientsByIngredient } from './scaleIngredients';
import { IngredientList, toIngredientMap } from './measuredIngredients';
import { buildMeasuredIngredient } from './ingredient';
import { grams, kilograms } from '../measurement/units';

const ingredients = [
  buildMeasuredIngredient('flour', grams(500)),
  buildMeasuredIngredient('butter', grams(400)),
  buildMeasuredIngredient('milk', grams(300)),
];

const ingredientsMap = toIngredientMap(ingredients);

describe('scaleIngredientsByFactor', () => {
  it('should multiply the measurements of all ingredients by the factor', () => {
    const scaledIngredientsMap = scaleIngredientsByFactor(2, ingredients);
    ingredients.forEach(ingredient => {
      const scaled = scaledIngredientsMap[ingredient.substance];
      expect(scaled.measurement.value).to.equal(2 * ingredient.measurement.value);
    });
  });
});

describe('scaleIngredientsByIngredient', () => {
  const ingredientToScale = buildMeasuredIngredient('flour', grams(1000))
  const scaledIngredientsMap = scaleIngredientsByIngredient(ingredientToScale, ingredients);

  it('should replace the original ingredient measurment with the new one', () => {
    expect(scaledIngredientsMap[ingredientToScale.substance]).to.deep.equal(ingredientToScale);
  });

  it('should increase the other ingredients by the ratio between the measurments', () => {
    ['milk', 'butter'].forEach(substance => {
      const scaled = scaledIngredientsMap[substance];
      expect(scaled.measurement.value).to.equal(2 * ingredientsMap[substance].measurement.value);
    });
  });

  context('if the ingredient is not alreay in the ingredients', () => {
    const unaddedIngredient = buildMeasuredIngredient('cola', grams(1000))
    const scaledMap = scaleIngredientsByIngredient(unaddedIngredient, ingredients);

    it('should not be added', () => {
      expect(scaledMap[unaddedIngredient.substance]).to.equal(undefined);
    });

    it('should not change the ingredients', () => {
      expect(scaledMap).to.deep.equal(ingredientsMap);
    });
  });

  context('if the ingredient is in different units', () => {
    it('should throw an exception', () => {
      const badIngredient = buildMeasuredIngredient('flour', kilograms(10));
      expect(
        () => scaleIngredientsByIngredient(badIngredient, ingredientsMap)
      ).to.throw(/conver/i);
    });
  });
});
