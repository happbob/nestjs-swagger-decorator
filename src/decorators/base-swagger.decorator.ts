import { ApiOperation } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { CustomResponseDecorator } from './response.decorator';
import { responseOptionProps } from '../types/responseOptionProps';

/**
 * This decorator serves as a base decorator for Swagger API documentation,
 *
 * @param apiOperationProps Partial configuration object for the API operation. This configures the
 *                          operation details such as summary, description, etc.
 * @param responseOption An array of response options, used to document responses.
 * @param responseOperations (Optional) Additional method or class decorators that can be applied.
 *
 * @returns A decorator that applies the specified Swagger API operation and response documentation.
 */
export const BaseSwaggerDecorator = (
  apiOperationProps: Partial<OperationObject>,
  responseOperations?: (MethodDecorator & ClassDecorator)[],
  responseOption?: responseOptionProps[],
) => {
  const responseDecorators: (MethodDecorator & ClassDecorator)[] = [];

  // Map through the response options and apply the response decorator for each one
  responseOption?.map((option) => {
    return responseDecorators.push(
      option.baseResponseDto
        ? CustomResponseDecorator(
            option.statusCode,
            option.responseOptions,
            option.baseResponseDto,
          )
        : CustomResponseDecorator(option.statusCode, option.responseOptions),
    );
  });

  // Push additional response operations, if any, to the array of decorators
  responseDecorators.push(...(responseOperations || []));

  // Apply the ApiOperation decorator along with the collected response decorators
  return applyDecorators(
    ApiOperation(apiOperationProps),
    ...responseDecorators,
  );
};
