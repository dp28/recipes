import { expect } from "chai";
import "mocha";
import { parseIngredients, ParsedIngredient } from "./parser/ingredientParser";
import {
  buildMeasuredIngredient,
  scaleIngredientsByIngredient,
  MeasuredIngredient
} from "./ingredients";
import { ounces, cups, grams } from "./measurement/units";

describe("parsing and scaling", () => {
  it("should all work together", () => {
    const raw = ["1 cup milk", "2oz of flour", "50g sugar"];
    const ingredients = parseIngredients(raw);
    const scaled = scaleIngredientsByIngredient(
      buildMeasuredIngredient("flour", ounces(4)),
      ingredients
    );
    const ordered = Object.values(scaled)
      .map(withoutOriginal)
      .sort(substanceComparator);
    expect(ordered).to.eql([
      buildMeasuredIngredient("flour", ounces(4)),
      buildMeasuredIngredient("milk", cups(2)),
      buildMeasuredIngredient("sugar", grams(100))
    ]);
  });
});

function withoutOriginal({
  substance,
  measurement
}: ParsedIngredient): MeasuredIngredient {
  return { substance, measurement };
}

function substanceComparator(
  a: MeasuredIngredient,
  b: MeasuredIngredient
): number {
  if (a.substance < b.substance) {
    return -1;
  } else {
    return a.substance == b.substance ? 0 : +1;
  }
}
