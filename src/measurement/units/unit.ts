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

export type UnitRef = Unit | string;

export interface UnitMap {
  [symbol: string]: Unit;
}

export function toUnitSymbol(unitRef: UnitRef): string {
  if (typeof unitRef === 'string') {
    return unitRef;
  }
  else {
    return unitRef.symbol;
  }
}
