import { expect } from "chai";
import "mocha";
import { parseIngredients } from "./parser/ingredientParser";
import {
  buildMeasuredIngredient,
  scaleIngredientsByIngredient
} from "./ingredients";
import { Pound, pounds, Cup } from "./measurement/units";
import { convertRelevantIngredients } from "./ingredients/convertIngredients";

describe("parsing, converting, and scaling", () => {
  it("should all work together", () => {
    const raw = ["1 cup milk", "4oz of flour", "908g sugar"];
    const ingredients = parseIngredients(raw);
    const converted = convertRelevantIngredients(Pound, ingredients);
    const scaled = scaleIngredientsByIngredient(
      buildMeasuredIngredient("flour", pounds(1)),
      converted
    );
    expect(scaled.flour.measurement.unit).to.equal(Pound.symbol);
    expect(Math.round(scaled.flour.measurement.value)).to.equal(1);

    expect(scaled.milk.measurement.unit).to.equal(Cup.symbol);
    expect(Math.round(scaled.milk.measurement.value)).to.equal(4);

    expect(scaled.sugar.measurement.unit).to.equal(Pound.symbol);
    expect(Math.round(scaled.sugar.measurement.value)).to.equal(8);
  });
});
