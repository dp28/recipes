import { Unit } from "./unit";
import { Quantity } from "../quantity";
import { buildMeasurementCurried } from "../measurement";

export const Millilitre = buildVolumeUnit(`ml`, `Millilitre`);
export const millilitres = buildMeasurementCurried(Millilitre);
export const Litre = buildVolumeUnit(`L`, `Litre`);
export const litres = buildMeasurementCurried(Litre);

export const UKTeaspoon = buildVolumeUnit(`tsp (UK)`, `UK Teaspoon`);
export const UKTablespoon = buildVolumeUnit(`tbsp (UK)`, `UK Tablespoon`);
export const UKFluidOunce = buildVolumeUnit(`fl oz (UK)`, `UK Fluid Ounce`);
export const UKPint = buildVolumeUnit(`pt (UK)`, `UK Pint`);
export const UKGallon = buildVolumeUnit(`gal (UK)`, `UK Gallon`);

export const ukTeaspoons = buildMeasurementCurried(UKTeaspoon);
export const ukTablespoons = buildMeasurementCurried(UKTablespoon);
export const ukFluidOunces = buildMeasurementCurried(UKFluidOunce);
export const ukPints = buildMeasurementCurried(UKPint);
export const ukGallons = buildMeasurementCurried(UKGallon);

export const Teaspoon = buildVolumeUnit(`tsp`, `Teaspoon`);
export const Tablespoon = buildVolumeUnit(`tbsp`, `Tablespoon`);
export const FluidOunce = buildVolumeUnit(`fl oz`, `Fluid Ounce`);
export const Cup = buildVolumeUnit(`cp`, `Cup`);
export const Pint = buildVolumeUnit(`pt`, `Pint`);
export const Gallon = buildVolumeUnit(`gal`, `Gallon`);

export const teaspoons = buildMeasurementCurried(Teaspoon);
export const tablespoons = buildMeasurementCurried(Tablespoon);
export const fluidOunces = buildMeasurementCurried(FluidOunce);
export const cups = buildMeasurementCurried(Cup);
export const pints = buildMeasurementCurried(Pint);
export const gallons = buildMeasurementCurried(Gallon);

function buildVolumeUnit(symbol: string, name: string): Unit {
  return {
    symbol,
    quantity: Quantity.Volume,
    name: {
      singular: `${name}`,
      plural: `${name}s`
    }
  };
}
