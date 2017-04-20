import { Measurement } from '../measurement';
import { UnitRef, toUnitSymbol } from '../units';

export type Conversion = {
  from: UnitRef;
  to: UnitRef;
  changes: ConversionChange[];
}

type ConversionChange = {
  value: number;
  type: 'add' | 'multiply';
}

type ConversionMap = {
  [symbol: string]: {
    [symbol: string]: Conversion
  }
}

export function convert(conversions: Conversion[]): (m: Measurement, u: UnitRef) => Measurement {
  const map = buildConversionMap(conversions);
  return (measurement, unit) => convertUsingMap(map, measurement, unit);
}

function convertUsingMap(
  map: ConversionMap,
  measurement: Measurement,
  unitRef: UnitRef
): Measurement {
  const unit = toUnitSymbol(unitRef);
  const conversion = fetchConversion(map, measurement, unit);
  const value = convertValue(conversion, measurement.value);
  return { value, unit };
}

function fetchConversion(map: ConversionMap, { unit }: Measurement, otherUnit: string): Conversion {
  if (map[unit] && map[unit][otherUnit]) {
    return map[unit][otherUnit];
  }
  throw `No known conversion from ${unit} to ${otherUnit}`;
}

function convertValue({ changes }: Conversion, value: number): number {
  const newValue = changes.reduce(applyChange, value);
  return roundToPrecision(newValue, 7);
}

function applyChange(value: number, change: ConversionChange): number {
  return change.type === 'add' ? value + change.value : value * change.value;
}

function buildConversionMap(conversions: Conversion[]): ConversionMap {
  return conversions.reduce(addConversion, {});
}

function addConversion(map: ConversionMap, conversion: Conversion): ConversionMap {
  insertConversions(map, [conversion, invert(conversion)]);
  insertMissingConversions(map, conversion);
  return map;
}

function insertMissingConversions(map: ConversionMap, conversion: Conversion): void {
  const missed = findMissingConversions(map, conversion);
  insertConversions(map, missed);
  const missedInverted = findMissingConversions(map, invert(conversion));
  insertConversions(map, missedInverted);;
  const allMissed = [ ...missed, ...missedInverted ];
  if (allMissed.length === 0)
    return
  allMissed.forEach(missedConversion => insertMissingConversions(map, missedConversion));
}

function insertConversions(map: ConversionMap, conversions: Conversion[]): void {
  conversions.forEach(conversion => insertConversion(map, conversion));
}

function insertConversion(map: ConversionMap, conversion: Conversion): void {
  const fromSymbol = toUnitSymbol(conversion.from);
  const fromConversions = map[fromSymbol] || {};
  fromConversions[toUnitSymbol(conversion.to)] = conversion;
  map[fromSymbol] = fromConversions;
}

function invert({ to, from, changes }: Conversion): Conversion {
  return {
    from: to,
    to: from,
    changes: changes.map(invertChange).reverse(),
  }
}

function invertChange(change: ConversionChange): ConversionChange {
  const value = change.type === 'add' ? -change.value : 1 / change.value;
  return { ...change, value };
}

function findMissingConversions(map: ConversionMap, conversion: Conversion): Conversion[] {
  const from = toUnitSymbol(conversion.from);
  const fromConversions = map[from] || {};
  const toConversions = map[toUnitSymbol(conversion.to)] || {};

  return Object
    .keys(toConversions)
    .filter(symbol => symbol !== from && !fromConversions[symbol])
    .map(symbol => merge(conversion, toConversions[symbol]))
}

function merge(conversion: Conversion, other: Conversion): Conversion {
  return {
    from: conversion.from,
    to: other.to,
    changes: conversion.changes.concat(other.changes)
  };
}

function roundToPrecision(value: number, precision: number): number {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}
