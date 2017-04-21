import { convert as unconnectedConvert } from './convert';
import { conversions } from './massConversions';

export const convert = unconnectedConvert(conversions);
