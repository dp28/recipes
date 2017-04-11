import { Unit } from './unit';
import { Quantity } from '../quantity';

export const Ounce : Unit = {
  symbol: `oz`,
  quantity: Quantity.Mass,
  name: {
    singular: `ounce`,
    plural: `ounces`
  }
}
