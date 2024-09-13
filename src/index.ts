import { ResponseType } from './types/ok-response.type';
import { ApiOperation, ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const BaseSwaggerDecorator = (
  apiSummary: string,
  apiResponseOperationPropsList?: ResponseType[],
  responseOperations?: (MethodDecorator & ClassDecorator)[],
) => {
  const successResponseDecorators: (MethodDecorator & ClassDecorator)[] = [];

  apiResponseOperationPropsList?.map((apiResponseOperationProps) => {
    successResponseDecorators.push(
      ApiResponse({
        status: apiResponseOperationProps.status,
        description: apiResponseOperationProps.description,
        type: apiResponseOperationProps.type,
      }),
    );
  });

  responseOperations?.map((responseOperation) => {});

  return applyDecorators(
    ApiOperation({ summary: apiSummary }),
    ...successResponseDecorators,
  );
};
