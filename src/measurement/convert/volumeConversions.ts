import {
  Millilitre,
  Litre,
  ImperialTeaspoon,
  ImperialTablespoon,
  ImperialFluidOunce,
  ImperialPint,
  ImperialGallon,
  USTeaspoon,
  USTablespoon,
  USFluidOunce,
  USCup,
  USPint,
  USGallon,
} from '../units';

import { conversionRatio, Conversion } from './convert';

export const conversions: Conversion[] = [
  conversionRatio(1000, Millilitre, Litre),

  conversionRatio(8, ImperialPint, ImperialGallon),
  conversionRatio(20, ImperialFluidOunce, ImperialPint),
  conversionRatio(1.6, ImperialTablespoon, ImperialFluidOunce),
  conversionRatio(3, ImperialTeaspoon, ImperialTablespoon),

  conversionRatio(8, USPint, USGallon),
  conversionRatio(16, USFluidOunce, USPint),
  conversionRatio(8, USFluidOunce, USCup),
  conversionRatio(2, USTablespoon, USFluidOunce),
  conversionRatio(3, USTeaspoon, USTablespoon),

  conversionRatio(1.014420681 / 30, USFluidOunce, Millilitre),
  conversionRatio(1.014420681 / 1.055852392, USFluidOunce, ImperialFluidOunce)
];
