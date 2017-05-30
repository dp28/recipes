import { expect } from 'chai';
import 'mocha';

import { buildMeasuredIngredient } from '../ingredients';
import { parseIngredient } from './ingredientParser';

describe('parseIngredient', () => {
  context('if the ingredient is null', () => {
    it('should return null', () => {
      expect(parseIngredient(null)).to.equal(null);
    });
  });

  context('if the ingredient is an empty string', () => {
    it('should return null', () => {
      expect(parseIngredient('')).to.equal(null);
    });
  });

  context('if the ingredient does not contain a measurement', () => {
    it('should return null', () => {
      expect(parseIngredient('some bogus text')).to.equal(null);
    });
  });

  context('if the ingredient does contain a measurement', () => {
    it('should return a ParsedIngredient with the input as its "original" property', () => {
      expect(parseIngredient('20g cheese').original).to.equal('20g cheese');
    });
  });
});
