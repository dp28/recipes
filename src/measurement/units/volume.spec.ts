import { expect } from 'chai';
import 'mocha';

import { Measurement } from '../measurement';
import {
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
} from './volume';

const measurementBuilders: { [unit: string]: (_: number) => Measurement } = {
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
}

const unitsToNames: { [unit: string]: string } = {
  ml: 'millilitres',
  L: 'litres',
  'tsp (imperial)': 'imperialTeaspoons',
  'tbsp (imperial)': 'imperialTablespoons',
  'fl oz (imperial)': 'imperialFluidOunces',
  'pt (imperial)': 'imperialPints',
  'gal (imperial)': 'imperialGallons',
  'tsp (US)': 'usTeaspoons',
  'tbsp (US)': 'usTablespoons',
  'cp (US)': 'usCups',
  'fl oz (US)': 'usFluidOunces',
  'pt (US)': 'usPints',
  'gal (US)': 'usGallons',
}

Object.keys(unitsToNames).forEach(unit => {
  const name = unitsToNames[unit];
  const measurementBuilder = measurementBuilders[name];

  describe(name, () => {
    it(`should build Measurements with '${unit}' units`, () => {
      expect(measurementBuilder(10)).to.deep.equal({ value: 10, unit });
    });
  });
});
