import { expect } from 'chai';
import 'mocha';

import { scale, ScaleOverride, ScaleOverrides } from './scale';
import { Measurement } from './measurement';

describe(`scale`, () => {
  const measurement = { value: 10, unit: 'g' };

  function itShouldMultiplyTheValueByTheFactor(call: () => Measurement) {
    it(`should return a measurement with the value multiplied by the factor`, () => {
      expect(call().value).to.equal(200);
    });
  };

  itShouldMultiplyTheValueByTheFactor(() => scale(measurement, 20));

  it(`should not change the original measurement`, () => {
    scale(measurement, 20);
    expect(measurement).to.deep.equal({ value: 10, unit: 'g' });
  });

  it(`should not change the measurement's unit`, () => {
    expect(scale(measurement, 20).unit).to.equal('g');
  });

  context(`if there are unit overrides specified`, () => {
    context(`but they do not have overrides for the provided unit`, () => {
      itShouldMultiplyTheValueByTheFactor(() => scale(measurement, 20, {}));
    });

    context(`but the relevant override does not have a scale function`, () => {
      itShouldMultiplyTheValueByTheFactor(() => scale(measurement, 20, { g: {} }));
    });

    context(`and the relevant override does have a scale function`, () => {

      it(`should return a measurement with the value modified using the scale override`, () => {
        const override: ScaleOverride = {
          scale: (value: number, factor: number): number => value * factor * 2
        };

        const overrides: ScaleOverrides = { g: override };
        const scaledValue = scale(measurement, 20, overrides).value;
        expect(scaledValue).to.deep.equal(400);
      });
    });
  });
});
