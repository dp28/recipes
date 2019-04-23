import {
  Millilitre,
  Litre,
  UKTeaspoon,
  UKTablespoon,
  UKFluidOunce,
  UKPint,
  UKGallon,
  Teaspoon,
  Tablespoon,
  FluidOunce,
  Cup,
  Pint,
  Gallon
} from "../units";

import { conversionRatio, Conversion } from "./convert";

export const conversions: Conversion[] = [
  conversionRatio(1000, Millilitre, Litre),

  conversionRatio(8, UKPint, UKGallon),
  conversionRatio(20, UKFluidOunce, UKPint),
  conversionRatio(1.6, UKTablespoon, UKFluidOunce),
  conversionRatio(3, UKTeaspoon, UKTablespoon),

  conversionRatio(8, Pint, Gallon),
  conversionRatio(16, FluidOunce, Pint),
  conversionRatio(8, FluidOunce, Cup),
  conversionRatio(2, Tablespoon, FluidOunce),
  conversionRatio(3, Teaspoon, Tablespoon),

  conversionRatio(1.014420681 / 30, FluidOunce, Millilitre),
  conversionRatio(1.014420681 / 1.055852392, FluidOunce, UKFluidOunce)
];
