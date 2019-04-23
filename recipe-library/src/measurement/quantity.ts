import { stringEnum } from "../utils/stringEnum";

export const Quantity = stringEnum([
  "Length",
  "Mass",
  "Time",
  "Temperature",
  "Volume",
  "Integer"
]);

export type Quantity = keyof typeof Quantity;
