import { expect } from 'chai';
import 'mocha';

import { convert, Conversion } from './convert';
import { grams, ounces, Gram, Ounce } from '../units';

const conversion: Conversion = {
  from: Gram,
  to: Ounce,
  changes: [{ value: 17.3, type: 'multiply' }]
};

const conversions = [conversion];

describe('convert', () => {
  const measurement = grams(1);

  it('should not change the original measurement', () => {
    convert(conversions)(measurement, Ounce);
    expect(measurement).to.deep.equal(grams(1));
  });

  function itShouldBeReversible(allConversions: Conversion[]) {
    context('if the conversion is reversed', () => {
      it('should result in a measurement equal to the original measurement', () => {
        const converted = convert(allConversions)(measurement, Ounce);
        expect(convert(allConversions)(converted, Gram)).to.deep.equal(measurement);
      });
    });
  }

  describe('the returned measurement', () => {
    it('should be in the passed-in units', () => {
      const converted = convert(conversions)(measurement, Ounce);
      expect(converted.unit).to.equal(Ounce.symbol);
    });

    context('if a "multiply" field is provided', () => {
      const multiplyConversion: Conversion = {
        from: Gram,
        to: Ounce,
        changes: [{ value: 17.3, type: 'multiply' }]
      };

      const multiplyConversions = [multiplyConversion];

      it('should multiply the value by the specified amount', () => {
        const converted = convert(multiplyConversions)(measurement, Ounce);
        expect(converted.value).to.equal(measurement.value * 17.3);
      });

      itShouldBeReversible(multiplyConversions);
    });

    context('if an "add" field is provided', () => {
      const addConversion: Conversion = {
        from: Gram,
        to: Ounce,
        changes: [{ value: 17.3, type: 'add' }]
      };

      const addConversions = [addConversion];

      it('should increase the value by the specified amount', () => {
        const converted = convert(addConversions)(measurement, Ounce);
        expect(converted.value).to.equal(measurement.value + 17.3);
      });

      itShouldBeReversible(addConversions);

      context('and a "multiply" field is provided', () => {
        const multiplyAndAddConversion: Conversion = {
          from: Gram,
          to: Ounce,
          changes: [{ value: 17.3, type: 'multiply' }, { value: 4, type: 'add' }]
        };
        const multiplyAndAddConversions = [multiplyAndAddConversion];

        it('should multiply the value by the specified amount, then add', () => {
          const converted = convert(multiplyAndAddConversions)(measurement, Ounce);
          expect(converted.value).to.equal((measurement.value * 17.3) + 4);
        });

        itShouldBeReversible(multiplyAndAddConversions);
      });
    });
  });

  context('if the conversion is unknown', () => {
    it('should throw an error', () => {
      expect(convert([]).bind(null, measurement, Ounce)).to.throw();
    });
  });

  context('if multiple conversions could be chained together to calculate the conversion', () => {
    const chainedConversions: Conversion[] = [
      { from: 'a', to: 'b', changes: [{ value: 10, type: 'multiply' }, { value: 4, type: 'add' }] },
      { from: 'c', to: 'b', changes: [{ value: 3, type: 'add' }] },
      { from: 'c', to: 'd', changes: [{ value: 7, type: 'multiply' }] },
    ];

    const multiMeasurement = { value: 7, unit: 'a' };

    it('should correctly perform the full conversion', () => {
      const converted = convert(chainedConversions)(multiMeasurement, 'd');
      expect(converted.value).to.equal(((7 * 10 + 4) - 3) * 7);
    });

    it('should be reversible', () => {
      const convertMulti = convert(chainedConversions);
      const converted = convertMulti(multiMeasurement, 'd');
      expect(convertMulti(converted, 'a')).to.deep.equal(multiMeasurement);
    });
  });
});
