import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ResponseType } from '../../types/response/ok-response.type';

export const BaseSwaggerDecorator = (
  apiSummary: string,
  responseOperations?: (MethodDecorator & ClassDecorator)[],
  apiResponseOperationPropsList?: ResponseType[],
) => {
  const responseDecorators: (MethodDecorator & ClassDecorator)[] = [];

  apiResponseOperationPropsList?.forEach((apiResponseOperationProps) => {
    responseDecorators.push(
      ApiResponse({
        status: apiResponseOperationProps.status,
        description: apiResponseOperationProps.description,
        type: apiResponseOperationProps.type,
      }),
    );
  });

  responseOperations?.forEach((responseOperation) => {
    responseDecorators.push(responseOperation);
  });

  return applyDecorators(
    ApiOperation({ summary: apiSummary }),
    ...responseDecorators,
  );
};
