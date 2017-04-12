import { Quantity } from '../quantity';

export interface Unit {
  symbol: string;
  quantity: Quantity;
  minimumStep?: number;
  name: {
    singular: string;
    plural: string;
  };
}

export interface UnitMap {
  [symbol: string]: Unit;
}
