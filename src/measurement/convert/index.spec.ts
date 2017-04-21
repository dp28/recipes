import { expect } from 'chai';
import 'mocha';

import { convert } from './index';
import { grams, ounces, pounds, kilograms, milligrams } from '../units';

describe('convert', () => {
  [
    [grams(1000), kilograms(1)],
    [kilograms(2.5), grams(2500)],
    [milligrams(1000), grams(1)],
    [milligrams(1000), kilograms(0.001)],
    [ounces(16), pounds(1)],
    [grams(453.59237), pounds(1)],
    [grams(28.349523125), ounces(1)],
    [ounces(1.7), kilograms(0.0481942)],
  ].forEach(([measure, converted]) => {
    it(`should convert ${measure.value}${measure.unit} to ` +
      `${converted.value}${converted.unit}`, () => {
      expect(convert(measure, converted.unit)).to.deep.equal(converted);
    });
  });
});
