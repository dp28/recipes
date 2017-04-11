import { expect } from 'chai';
import 'mocha';

import { Ounce } from './ounce';

describe(`Ounce`, () => {
  it(`has the symbol 'oz'`, () => {
    expect(Ounce.symbol).to.equal(`oz`);
  });

  it(`has the quantity 'Mass'`, () => {
    expect(Ounce.quantity).to.equal(`Mass`);
  });

  it(`has the singular name 'ounce'`, () => {
    expect(Ounce.name.singular).to.equal(`ounce`);
  });

  it(`has the plural name 'ounces'`, () => {
    expect(Ounce.name.plural).to.equal(`ounces`);
  });

  it(`does not have a custom 'scale' override`, () => {
    expect(Ounce.scale).not.to.exist;
  });
});
