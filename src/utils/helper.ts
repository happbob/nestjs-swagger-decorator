import { ApiPropertyOptions } from '@nestjs/swagger';

// Swagger metadata key
export const DECORATORS_PREFIX = 'swagger';
export const API_MODEL_PROPERTIES = `${DECORATORS_PREFIX}/apiModelProperties`;
export const API_MODEL_PROPERTIES_ARRAY = `${DECORATORS_PREFIX}/apiModelPropertiesArray`;

// type of constructor object using by NestJS
export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

// check is source form lodash object
export function isObject(value: any) {
  const type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

// Function to check if it is a default constructor
export function isFunction(value: any): value is Function {
  if (!isObject(value)) {
    return false;
  }
  return true;
}

// Functions obtained when described as '() => type' type of circular reference
export function isLazyTypeFunc(
  type: Function | Type<unknown>,
): type is { type: Function } & Function {
  return isFunction(type) && type.name == 'type';
}

// check is primitive type
export function isPrimitiveType(
  type:
    | string
    | Function
    | Type<unknown>
    | [Function]
    | Record<string, any>
    | undefined,
): boolean {
  return (
    typeof type === 'function' &&
    [String, Boolean, Number].some((item) => item === type)
  );
}

// Custom type checker to see if it is a Type
export function checkType(object: any): object is Type {
  return object;
}

// Define the type by adding the field name to the ApiPropertyOptions

export type ApiPropertyOptionsWithFieldName = ApiPropertyOptions & {
  fieldName: string;
};
