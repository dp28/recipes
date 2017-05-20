import { expect } from 'chai';
import 'mocha';

import { buildMeasuredIngredient } from './ingredient';
import { toIngredientMap, IngredientMap } from './measuredIngredients';

import { Measurement } from '../measurement';
import { grams } from '../measurement/units';

describe('toIngredientMap', () => {
  context('when given an IngredientMap', () => {
    const map = { flour: { substance: 'flour', measurement: grams(10) } };

    it('should just return the Map', () => {
      expect(toIngredientMap(map)).to.equal(map);
    });
  });

  context('when given an IngredientList', () => {
    const map = { flour: { substance: 'flour', measurement: grams(10) } };
    const list = [buildMeasuredIngredient('flour', grams(10))];

    it('should just return the Map', () => {
      expect(toIngredientMap(list)).to.deep.equal(map);
    });
  });
});
