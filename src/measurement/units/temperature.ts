import { Unit, UnitRef } from "./unit";
import { Quantity } from "../quantity";
import { buildMeasurementCurried, Measurement } from "../measurement";

export const Celsius = buildTemperatureUnit(`C`, `Celsius`);
export const Fahrenheit = buildTemperatureUnit(`F`, `Fahrenheit`);
export const Kelvin = buildTemperatureUnit(`K`, `Kelvin`);

export const celsius = buildMeasurementCurried(Celsius);
export const fahrenheit = buildMeasurementCurried(Fahrenheit);
export const kelvin = buildMeasurementCurried(Kelvin);

function buildTemperatureUnit(symbol: string, name: string): Unit {
  return {
    symbol,
    quantity: Quantity.Temperature,
    name: {
      singular: `degree ${name}`,
      plural: `degrees ${name}`
    }
  };
}
