import { Celsius, Kelvin, Fahrenheit } from "../units";
import { Conversion } from "./convert";

export const conversions: Conversion[] = [
  {
    from: Celsius.symbol,
    to: Fahrenheit.symbol,
    changes: [{ type: "multiply", value: 9 / 5 }, { type: "add", value: 32 }]
  },
  {
    from: Celsius.symbol,
    to: Kelvin.symbol,
    changes: [{ type: "add", value: 273.15 }]
  }
];
