import { expect } from 'chai';
import 'mocha';

import { scale } from './scale';
import { Measurement, buildMeasurement } from './measurement';
import { Gram } from './units';

describe(`measurement`, () => {

  context(`when called with a number and a Unit`, () => {
    const result = buildMeasurement(Gram, 10);

    it(`should return a measurement with the passed in value`, () => {
      expect(result.value).to.equal(10);
    });

    it(`should return a measurement with the passed in Unit's symbol`, () => {
      expect(result.unit).to.equal(Gram.symbol);
    });
  });

  context(`when called with a number and a String`, () => {
    const result = buildMeasurement('ml', 10);

    it(`should return a measurement with the passed in value`, () => {
      expect(result.value).to.equal(10);
    });

    it(`should return a measurement with the passed in string as the unit`, () => {
      expect(result.unit).to.equal('ml');
    });
  });
});
