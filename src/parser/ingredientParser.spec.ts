import { expect } from "chai";
import "mocha";

import { parseIngredient } from "./ingredientParser";
import { Gram, Litre, Cup } from "../measurement/units";

describe("parseIngredient", () => {
  context("if the ingredient is null", () => {
    it("should return null", () => {
      expect(parseIngredient(null)).to.equal(null);
    });
  });

  context("if the ingredient is an empty string", () => {
    it("should return null", () => {
      expect(parseIngredient("")).to.equal(null);
    });
  });

  context("if the ingredient does not contain a measurement", () => {
    it("should return null", () => {
      expect(parseIngredient("some bogus text")).to.equal(null);
    });
  });

  context("if the ingredient does contain a measurement", () => {
    it('should return a ParsedIngredient with the input as its "original" property', () => {
      expect(parseIngredient("20g cheese").original).to.equal("20g cheese");
    });

    it("should return the non-measurement text as the substance", () => {
      expect(parseIngredient("20g cheese").substance).to.equal("cheese");
    });

    it("should return the measurement value correctly", () => {
      expect(parseIngredient("20g cheese").measurement.value).to.equal(20);
    });

    it("should return the measurement unit correctly", () => {
      expect(parseIngredient("20g cheese").measurement.unit).to.equal(
        Gram.symbol
      );
    });

    describe("and the measurement is in litres", () => {
      it("should still return the measurement unit correctly", () => {
        expect(parseIngredient("2L milk").measurement.unit).to.equal(
          Litre.symbol
        );
      });
    });

    describe("and the measurement is in cups", () => {
      it("should use cups", () => {
        expect(parseIngredient("2 cups milk").measurement.unit).to.equal(
          Cup.symbol
        );
      });
    });

    describe('and the ingredient contains "of"', () => {
      it('should not include "of" in the substance', () => {
        expect(parseIngredient("2 cups of milk").substance).to.equal("milk");
      });
    });
  });
});
