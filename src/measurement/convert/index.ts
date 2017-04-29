import { convert as unconnectedConvert } from './convert';
import * as mass from './massConversions';
import * as temperature from './temperatureConversions';

const conversions = [mass, temperature].reduce(
  (all, next) => all.concat(next.conversions),
  []
)

export const convert = unconnectedConvert(conversions);
