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

  millilitres,
  litres,
  imperialTeaspoons,
  imperialTablespoons,
  imperialFluidOunces,
  imperialPints,
  imperialGallons,
  usTeaspoons,
  usTablespoons,
  usFluidOunces,
  usCups,
  usPints,
  usGallons,
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
    [fahrenheit(100), kelvin(310.928)],

    [litres(1), millilitres(1000)],

    [imperialPints(8), imperialGallons(1)],
    [imperialFluidOunces(160), imperialGallons(1)],
    [imperialFluidOunces(20), imperialPints(1)],
    [imperialFluidOunces(0.625), imperialTablespoons(1)],
    [imperialTeaspoons(3), imperialTablespoons(1)],

    [usPints(8), usGallons(1)],
    [usCups(2), usPints(1)],
    [usFluidOunces(8), usCups(1)],
    [usFluidOunces(0.5), usTablespoons(1)],
    [usTeaspoons(3), usTablespoons(1)],

    [usPints(1), millilitres(473.176)],
    [usPints(1), imperialPints(0.832674)],
    [usGallons(1), millilitres(3785.41)],
    [imperialGallons(1), millilitres(4546.09)],
  ].forEach(([measure, expected]) => {
    it(`should convert ${measure.value}${measure.unit} to ` +
      `${expected.value}${expected.unit}`, () => {
      const converted = convert(measure, expected.unit);
      expect(
        equalToSixSignificantFigures(converted.value, expected.value)
      ).to.be.true;
    });
  });
});

function equalToSixSignificantFigures(first: number, second: number): boolean {
  return first.toPrecision(6) === second.toPrecision(6);
}
