import { expect } from 'chai';
import 'mocha';

import { convert } from './index';
import {
  grams,
  ounces,
  pounds,
  kilograms,
  milligrams,
  celsius,
  fahrenheit,
  kelvin,
} from '../units';

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

    [celsius(0), fahrenheit(32)],
    [celsius(-17.7777778), fahrenheit(0)],
    [celsius(100), fahrenheit(212)],
    [celsius(0), kelvin(273.15)],
    [kelvin(100), fahrenheit(-279.67)],
    [fahrenheit(100), kelvin(310.9277778)],
  ].forEach(([measure, converted]) => {
    it(`should convert ${measure.value}${measure.unit} to ` +
      `${converted.value}${converted.unit}`, () => {
      expect(convert(measure, converted.unit)).to.deep.equal(converted);
    });
  });
});
