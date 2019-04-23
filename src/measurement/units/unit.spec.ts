import { expect } from "chai";
import "mocha";

import { toUnitSymbol } from "./unit";
import { Gram } from "./mass";

describe(`toUnitSymbol`, () => {
  context(`when given a string`, () => {
    it(`should return the string`, () => {
      expect(toUnitSymbol(`w`)).to.equal(`w`);
    });
  });

  context(`when given a Unit`, () => {
    it(`should return the Unit's symbol`, () => {
      expect(toUnitSymbol(Gram)).to.equal(`g`);
    });
  });
});
