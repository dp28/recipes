import { Unit } from './unit';
import { Quantity } from '../quantity';

export const Gram : Unit = {
  symbol: `g`,
  quantity: Quantity.Mass,
  name: {
    singular: `gram`,
    plural: `grams`
  }
}
