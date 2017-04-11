import { ScaleOverride } from '../scale';
import { Quantity } from '../quantity';

export interface Unit extends ScaleOverride {
  symbol: string;
  quantity: Quantity;
  name: {
    singular: string;
    plural: string;
  };
}
