import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { makeInstanceByApiProperty } from '../utils/makeInstanceByApiProperty';
import { mergeObjects } from '../utils/mergeTwoObj';
import { ResponseOption } from '../types/responseOption';

/**
 * This decorator is designed to easily document multiple response values.
 * By default, when the status code is the same, only one example can be provided.
 * This was customized to add multiple examples for the same status code.
 * @param statusCode The HTTP status code. You can use values from the HttpStatus enum.
 * @param responseOptions responseOptions[] Options to add multiple examples for the same status code.
 * @param baseResponseDto The Base response DTO, if any.
 * @returns A decorator that applies Swagger documentation for the provided response options.
 */
export const CustomResponseDecorator = (
  statusCode: HttpStatus,
  responseOptions: ResponseOption[],
  baseResponseDto?: Type<any>,
) => {
  const examples = responseOptions
    .map((response: ResponseOption) => {
      let responseInstace: any = {};

      const DtoModel = response.model;

      // When a base response format is provided
      if (baseResponseDto) {
        // Create an instance of the base response format
        responseInstace =
          makeInstanceByApiProperty<typeof baseResponseDto>(baseResponseDto);

        // Create data using the DtoModel and generic
        const dtoData = makeInstanceByApiProperty<typeof DtoModel>(
          DtoModel,
          response.generic,
        );

        // If overwriteValue exists, overwrite the data
        if (response.overwriteValue) {
          responseInstace.data = mergeObjects(
            {},
            dtoData,
            response.overwriteValue,
          );
        } else {
          responseInstace.data = dtoData;
        }
      } else {
        // If there is no base response format, just use the DtoModel
        responseInstace = makeInstanceByApiProperty<typeof DtoModel>(
          DtoModel,
          response.generic,
        );

        if (response.overwriteValue) {
          responseInstace = { ...responseInstace, ...response.overwriteValue };
        }
      }

      return {
        [response.exampleTitle]: {
          value: responseInstace,
          description: response.exampleDescription,
        },
      };
    })
    .reduce(function (result, item) {
      Object.assign(result, item);
      return result;
    }, {}); // Filter out null values

  // Functions to define schema
  const extraModel = responseOptions.map((e) => {
    return e.model;
  }) as unknown as Type[];
  // Remove duplicates
  const setOfExtraModel = new Set(extraModel);
  // Add $ref
  const pathsOfDto = [...setOfExtraModel].map((e) => {
    return { $ref: getSchemaPath(e) };
  });
  // Handle generics
  const extraGeneric = responseOptions
    .map((e) => {
      return e.generic;
    })
    .filter((e) => e) as unknown as Type[];
  const pathsOfGeneric = extraGeneric.map((e) => {
    return { $ref: getSchemaPath(e) };
  });

  // Create the decorator
  return applyDecorators(
    // To use $ref, extra models need to be registered
    baseResponseDto
      ? ApiExtraModels(...extraModel, ...extraGeneric, baseResponseDto)
      : ApiExtraModels(...extraModel, ...extraGeneric),
    ApiResponse({
      status: statusCode,
      content: {
        'application/json': {
          schema: {
            // If a base response format is provided, define the schema with additional properties
            ...(baseResponseDto && {
              additionalProperties: {
                $ref: getSchemaPath(baseResponseDto),
              },
            }),
            oneOf: [...pathsOfDto, ...pathsOfGeneric],
          },
          examples: examples,
        },
      },
    }),
  );
};
