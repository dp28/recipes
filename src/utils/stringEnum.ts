export function stringEnum<T extends string>(values: T[]): { [K in T]: T } {
  return values.reduce((map, value) => {
    map[value] = value;
    return map;
  }, Object.create(null));
}
