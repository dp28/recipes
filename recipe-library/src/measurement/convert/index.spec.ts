import { expect } from "chai";
import "mocha";

import { convert } from "./index";
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
  ukTeaspoons,
  ukTablespoons,
  ukFluidOunces,
  ukPints,
  ukGallons,
  teaspoons,
  tablespoons,
  fluidOunces,
  cups,
  pints,
  gallons
} from "../units";

describe("convert", () => {
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

    [ukPints(8), ukGallons(1)],
    [ukFluidOunces(160), ukGallons(1)],
    [ukFluidOunces(20), ukPints(1)],
    [ukFluidOunces(0.625), ukTablespoons(1)],
    [ukTeaspoons(3), ukTablespoons(1)],

    [pints(8), gallons(1)],
    [cups(2), pints(1)],
    [fluidOunces(8), cups(1)],
    [fluidOunces(0.5), tablespoons(1)],
    [teaspoons(3), tablespoons(1)],

    [pints(1), millilitres(473.176)],
    [pints(1), ukPints(0.832674)],
    [gallons(1), millilitres(3785.41)],
    [ukGallons(1), millilitres(4546.09)]
  ].forEach(([measure, expected]) => {
    it(
      `should convert ${measure.value}${measure.unit} to ` +
        `${expected.value}${expected.unit}`,
      () => {
        const converted = convert(measure, expected.unit);
        expect(equalToSixSignificantFigures(converted.value, expected.value)).to
          .be.true;
      }
    );
  });
});

function equalToSixSignificantFigures(first: number, second: number): boolean {
  return first.toPrecision(6) === second.toPrecision(6);
}
