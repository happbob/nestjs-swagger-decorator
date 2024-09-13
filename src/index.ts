import { ResponseType } from './types/ok-response.type';
import { ApiOperation, ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const BaseSwaggerDecorator = (
  apiSummary: string,
  responseOperations?: (MethodDecorator & ClassDecorator)[],
  apiResponseOperationPropsList?: ResponseType[],
) => {
  const responseDecorators: (MethodDecorator & ClassDecorator)[] = [];

  apiResponseOperationPropsList?.map((apiResponseOperationProps) => {
    responseDecorators.push(
      ApiResponse({
        status: apiResponseOperationProps.status,
        description: apiResponseOperationProps.description,
        type: apiResponseOperationProps.type,
      }),
    );
  });

  responseOperations?.map((responseOperation) => {
    responseDecorators.push(responseOperation);
  });

  return applyDecorators(
    ApiOperation({ summary: apiSummary }),
    ...responseDecorators,
  );
};
