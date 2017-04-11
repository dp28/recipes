import { expect } from 'chai';
import 'mocha';

import { Gram } from './gram';

describe(`Gram`, () => {
  it(`has the symbol 'g'`, () => {
    expect(Gram.symbol).to.equal(`g`);
  });

  it(`has the quantity 'Mass'`, () => {
    expect(Gram.quantity).to.equal(`Mass`);
  });

  it(`has the singular name 'gram'`, () => {
    expect(Gram.name.singular).to.equal(`gram`);
  });

  it(`has the plural name 'grams'`, () => {
    expect(Gram.name.plural).to.equal(`grams`);
  });

  it(`does not have a custom 'scale' override`, () => {
    expect(Gram.scale).not.to.exist;
  });
});
