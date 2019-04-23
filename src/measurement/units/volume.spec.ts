import { expect } from "chai";
import "mocha";

import { Measurement } from "../measurement";
import {
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
} from "./volume";

const measurementBuilders: { [unit: string]: (_: number) => Measurement } = {
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
};

const unitsToNames: { [unit: string]: string } = {
  ml: "millilitres",
  L: "litres",
  "tsp (UK)": "ukTeaspoons",
  "tbsp (UK)": "ukTablespoons",
  "fl oz (UK)": "ukFluidOunces",
  "pt (UK)": "ukPints",
  "gal (UK)": "ukGallons",
  tsp: "teaspoons",
  tbsp: "tablespoons",
  cp: "cups",
  "fl oz": "fluidOunces",
  pt: "pints",
  gal: "gallons"
};

Object.keys(unitsToNames).forEach(unit => {
  const name = unitsToNames[unit];
  const measurementBuilder = measurementBuilders[name];

  describe(name, () => {
    it(`should build Measurements with '${unit}' units`, () => {
      expect(measurementBuilder(10)).to.deep.equal({ value: 10, unit });
    });
  });
});
