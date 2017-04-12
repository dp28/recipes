import { expect } from 'chai';
import 'mocha';

import { scale } from './scale';
import { Measurement } from './measurement';
import { Gram } from './units';

describe(`scale`, () => {
  const measurement = { value: 10, unit: Gram.symbol };

  function itShouldMultiplyTheValueByTheFactor(call: () => Measurement) {
    it(`should return a measurement with the value multiplied by the factor`, () => {
      expect(call().value).to.equal(200);
    });
  };

  itShouldMultiplyTheValueByTheFactor(() => scale(measurement, 20));

  it(`should not change the original measurement`, () => {
    scale(measurement, 20);
    expect(measurement).to.deep.equal({ value: 10, unit: Gram.symbol });
  });

  it(`should not change the measurement's unit`, () => {
    expect(scale(measurement, 20).unit).to.equal(Gram.symbol);
  });

  context(`if there is a UnitMap provided`, () => {
    context(`but it does not include the specified Unit`, () => {
      itShouldMultiplyTheValueByTheFactor(() => scale(measurement, 20, {}));
    });

    context(`but the relevant Unit does not have a minimum step`, () => {
      itShouldMultiplyTheValueByTheFactor(() => scale(measurement, 20, { [Gram.symbol]: Gram }));
    });

    context(`and the relevant override does have a minimum step`, () => {
      const TripleGram = { ...Gram, minimumStep: 3 };
      const unitMap = { [Gram.symbol]: TripleGram };

      context(`and the scaled value is divisible by the minimum step`, () => {
        it(`should return a measurement with the value multiplied by the factor`, () => {
          expect(scale(measurement, 3, unitMap).value).to.equal(30);
        });
      });

      context(`and the scaled value is would be rounded down to the nearest minimum step`, () => {
        it(`should return a measurement which is multiplied by the factor, rounded up to the
          nearest step`, () => {
          const scaledValue = scale(measurement, 4, unitMap).value;
          expect(scaledValue).to.deep.equal(42);
        });
      });

      context(`and the scaled value is would be rounded up to the nearest minimum step`, () => {
        it(`should return a measurement which is multiplied by the factor, rounded up to the
          nearest step`, () => {
          const scaledValue = scale(measurement, 2, unitMap).value;
          expect(scaledValue).to.deep.equal(21);
        });
      });
    });
  });
});
