import {
  API_MODEL_PROPERTIES,
  API_MODEL_PROPERTIES_ARRAY,
  ApiPropertyOptionsWithFieldName,
  checkType,
  isLazyTypeFunc,
  isPrimitiveType,
  Type,
} from './helper';
import 'reflect-metadata';

export function makeInstanceByApiProperty<T>(
  dtoClass: Type,
  generic?: Type,
): T {
  // Create an instance without using the constructor; only retrieve the type.
  // This avoids errors if the constructor requires parameters.
  const mappingDto: any = {};

  // Retrieve the field names saved by the ApiProperty decorator from metadata.
  const propertiesArray: string[] =
    Reflect.getMetadata(API_MODEL_PROPERTIES_ARRAY, dtoClass.prototype) || [];

  // Retrieve information for each field that was decorated with ApiProperty.
  const properties: ApiPropertyOptionsWithFieldName[] = propertiesArray.map(
    (field) => {
      // Remove the leading ":" from the field name (refer to createProperty in NestJS for why ":" is used)
      const fieldName = field.substring(1);

      // Retrieve the metadata for each field.
      const obj = Reflect.getMetadata(
        API_MODEL_PROPERTIES,
        dtoClass.prototype,
        fieldName,
      );
      obj.fieldName = fieldName;
      return obj;
    },
  );

  // Populate the mappingDto object (used a for-loop for simplicity).
  for (const property of properties) {
    const propertyType = property.type;

    // Check if property.type exists (it might be undefined if not specified in ApiProperty).
    if (propertyType) {
      // Custom handling for generics.
      // If the DTO has a generic type, use the `generic` argument.
      if (propertyType === 'generic') {
        // If it's an array, call this function recursively with the generic type inside an array.
        if (generic) {
          if (property.isArray) {
            mappingDto[property.fieldName] = [
              makeInstanceByApiProperty(generic),
            ];
          } else {
            // If it's an object, call this function directly with the generic type.
            mappingDto[property.fieldName] = makeInstanceByApiProperty(generic);
          }
        }
      } else if (propertyType === 'string') {
        // If it's a string-based enum.
        if (typeof property.example !== 'undefined') {
          mappingDto[property.fieldName] = property.example;
        } else {
          mappingDto[property.fieldName] = property.description;
        }
      } else if (propertyType === 'number') {
        // If it's a number-based enum.
        if (typeof property.example !== 'undefined') {
          mappingDto[property.fieldName] = property.example;
        } else {
          mappingDto[property.fieldName] = property.description;
        }
      } else if (isPrimitiveType(propertyType)) {
        // Handle primitive types [String, Boolean, Number].
        if (typeof property.example !== 'undefined') {
          mappingDto[property.fieldName] = property.example;
        } else {
          mappingDto[property.fieldName] = property.description;
        }
      } else if (isLazyTypeFunc(propertyType as Function | Type<unknown>)) {
        // Handle lazy types (e.g., type: () => PageMetaDto).
        // Execute the anonymous function to get the inner DTO type.
        const constructorType = (propertyType as Function)();
        if (Array.isArray(constructorType)) {
          mappingDto[property.fieldName] = [
            makeInstanceByApiProperty(constructorType[0]),
          ];
        } else if (property.isArray) {
          mappingDto[property.fieldName] = [
            makeInstanceByApiProperty(constructorType),
          ];
        } else {
          mappingDto[property.fieldName] =
            makeInstanceByApiProperty(constructorType);
        }
      } else if (checkType(propertyType)) {
        // Handle standard class types.
        if (property.isArray) {
          mappingDto[property.fieldName] = [
            makeInstanceByApiProperty(propertyType),
          ];
        } else {
          mappingDto[property.fieldName] =
            makeInstanceByApiProperty(propertyType);
        }
      }
    }
  }
  return mappingDto as T;
}
