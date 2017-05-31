import { expect } from 'chai';
import 'mocha';

import * as units from '../measurement/units';
import { Measurement } from '../measurement';
import { parseMeasurement } from './parseMeasurement';

describe('parseMeasurement', () => {
  context('if the input is null', () => {
    it('should return null', () => {
      expect(parseMeasurement(null)).to.equal(null);
    });
  });

  context('if the input is an empty string', () => {
    it('should return null', () => {
      expect(parseMeasurement('')).to.equal(null);
    });
  });

  context('if the input does not contain a measurement', () => {
    it('should return null', () => {
      expect(parseMeasurement('some bogus text')).to.equal(null);
    });
  });

  context('if the ingredient does contain a measurement', () => {
    const tests: { [text: string]: Measurement } = {
      '1g': units.grams(1),
      '10g': units.grams(10),
      '20 g': units.grams(20),
      '30 grams': units.grams(30),
      '4.5 kg': units.kilograms(4.5),
      '1 kg': units.kilograms(1),
      '1kilogram': units.kilograms(1),
      '1 kilograms': units.kilograms(1),
      '1 milligram': units.milligrams(1),
      '10 milligrams': units.milligrams(10),
      '1.0 mg': units.milligrams(1),

      // What to do about US / UK imperial units? different functions?
    }

    Object.keys(tests).forEach((text) => {
      context(`with input '${text}'`, () => {
        const expected = tests[text];

        it(`should return a measurement with unit '${expected.unit}'`, () => {
          expect(parseMeasurement(text).unit).to.equal(expected.unit);
        });

        it(`should return the number in the input`, () => {
          expect(parseMeasurement(text).value).to.equal(expected.value);
        });
      });
    });
  });
});
