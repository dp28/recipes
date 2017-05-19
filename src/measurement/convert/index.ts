import { convert as unconnectedConvert } from './convert';
import * as mass from './massConversions';
import * as temperature from './temperatureConversions';
import * as volume from './volumeConversions';

const conversions = [mass, temperature, volume].reduce(
  (all, next) => all.concat(next.conversions),
  []
)

export const convert = unconnectedConvert(conversions);
