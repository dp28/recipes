import { expect } from "chai";
import "mocha";

import { celsius, fahrenheit, kelvin } from "./temperature";

describe(`celsius`, () => {
  it(`should build Measurements with 'C' units`, () => {
    expect(celsius(10)).to.deep.equal({ value: 10, unit: `C` });
  });
});

describe(`fahrenheit`, () => {
  it(`should build Measurements with 'F' units`, () => {
    expect(fahrenheit(10)).to.deep.equal({ value: 10, unit: `F` });
  });
});

describe(`kelvin`, () => {
  it(`should build Measurements with 'K' units`, () => {
    expect(kelvin(10)).to.deep.equal({ value: 10, unit: `K` });
  });
});
