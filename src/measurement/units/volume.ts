import { Unit, UnitRef } from './unit';
import { Quantity } from '../quantity';
import { buildMeasurementCurried, Measurement } from '../measurement';

export const Millilitre = buildVolumeUnit(`ml`, `Millilitre`);
export const millilitres = buildMeasurementCurried(Millilitre);
export const Litre = buildVolumeUnit(`L`, `Litre`);
export const litres = buildMeasurementCurried(Litre);

export const ImperialTeaspoon = buildVolumeUnit(`tsp (imperial)`, `Imperial Teaspoon`);
export const ImperialTablespoon = buildVolumeUnit(`tbsp (imperial)`, `Imperial Tablespoon`);
export const ImperialFluidOunce = buildVolumeUnit(`fl oz (imperial)`, `Imperial Fluid Ounce`);
export const ImperialPint = buildVolumeUnit(`pt (imperial)`, `Imperial Pint`);
export const ImperialGallon = buildVolumeUnit(`gal (imperial)`, `Imperial Gallon`);

export const imperialTeaspoons = buildMeasurementCurried(ImperialTeaspoon);
export const imperialTablespoons = buildMeasurementCurried(ImperialTablespoon);
export const imperialFluidOunces = buildMeasurementCurried(ImperialFluidOunce);
export const imperialPints = buildMeasurementCurried(ImperialPint);
export const imperialGallons = buildMeasurementCurried(ImperialGallon);

export const USTeaspoon = buildVolumeUnit(`tsp (US)`, `US Teaspoon`);
export const USTablespoon = buildVolumeUnit(`tbsp (US)`, `US Tablespoon`);
export const USFluidOunce = buildVolumeUnit(`fl oz (US)`, `US Fluid Ounce`);
export const USCup = buildVolumeUnit(`cp (US)`, `US Cup`);
export const USPint = buildVolumeUnit(`pt (US)`, `US Pint`);
export const USGallon = buildVolumeUnit(`gal (US)`, `US Gallon`);

export const usTeaspoons = buildMeasurementCurried(USTeaspoon);
export const usTablespoons = buildMeasurementCurried(USTablespoon);
export const usFluidOunces = buildMeasurementCurried(USFluidOunce);
export const usCups = buildMeasurementCurried(USCup);
export const usPints = buildMeasurementCurried(USPint);
export const usGallons = buildMeasurementCurried(USGallon);

export const VolumeUnits = [
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
];

function buildVolumeUnit(symbol: string, name: string): Unit {
  return {
    symbol,
    quantity: Quantity.Volume,
    name: {
      singular: `${name}`,
      plural: `${name}s`
    }
  }
}
