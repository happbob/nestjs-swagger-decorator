import { HttpStatus, Type } from '@nestjs/common';
import { ResponseOption } from './responseOption';

export type responseOptionProps = {
  /**
   * Specifies the status code for the response.
   * ex) 200, 201, 204, 400, 401, 403, 404, 500
   */
  statusCode: HttpStatus;

  /**
   * Specifies the response options.
   * ex) { model: GetUserResponseDto, exampleTitle: 'Get User', exampleDescription: 'when user get self information, this response will be returned' }
   */
  responseOptions: ResponseOption[];

  /**
   * Takes a base response dto type.
   * BaseResponseDto should have a generic type with data field.
   * ex) BaseResponseDto<UserResponseDto>
   */
  baseResponseDto?: Type<any>;
};
