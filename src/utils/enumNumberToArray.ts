const StringIsNumber = (value: string) => isNaN(Number(value)) === true;

// Turn enum into array
export function EnumToArray(enumData: any): string[] {
  return Object.keys(enumData)
    .filter(StringIsNumber)
    .map((key) => enumData[key]);
}
