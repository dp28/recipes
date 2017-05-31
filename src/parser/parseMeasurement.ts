import { Measurement } from '../measurement';
import { Unit, VolumeUnits, MassUnits, TemperatureUnits } from '../measurement/units';


export function parseMeasurement(input: string): Measurement {
  if (!input)
    return null;
  const value = findNumber(input);
  const unit = parseUnit(input);
  if (value === null || !unit)
    return null;
  return { unit, value };
}

function findNumber(input: string): number {
  const match = input.match(/(\d+\.?\d*)/);
  return match && match[1] ? parseFloat(match[1]) : null;
}

const ParserMap = [ ...MassUnits, ...VolumeUnits, ...TemperatureUnits].reduce(appendParsers, {});

function parseUnit(input: string): string {
  for (const regex in ParserMap) {
    if (input.match(regex)) {
      return ParserMap[regex];
    }
  }
}

interface ParserMap {
  [regex: string]: string;
}

function appendParsers(parserMap: ParserMap, unit: Unit): ParserMap {
  parserMap[unit.symbol] = unit.symbol;
  parserMap[unit.name.singular] = unit.symbol;
  parserMap[unit.name.plural] = unit.symbol;
  return parserMap;
}
