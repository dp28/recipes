import { expect } from "chai";
import "mocha";

import { grams, ounces, pounds, kilograms, milligrams } from "./mass";

describe(`grams`, () => {
  it(`should build Measurements with 'g' units`, () => {
    expect(grams(10)).to.deep.equal({ value: 10, unit: `g` });
  });
});

describe(`kilograms`, () => {
  it(`should build Measurements with 'kg' units`, () => {
    expect(kilograms(10)).to.deep.equal({ value: 10, unit: `kg` });
  });
});

describe(`milligrams`, () => {
  it(`should build Measurements with 'mg' units`, () => {
    expect(milligrams(10)).to.deep.equal({ value: 10, unit: `mg` });
  });
});

describe(`ounces`, () => {
  it(`should build Measurements with 'oz' units`, () => {
    expect(ounces(10)).to.deep.equal({ value: 10, unit: `oz` });
  });
});

describe(`pounds`, () => {
  it(`should build Measurements with 'lb' units`, () => {
    expect(pounds(10)).to.deep.equal({ value: 10, unit: `lb` });
  });
});
