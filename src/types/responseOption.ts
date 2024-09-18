import { Type } from '@nestjs/common';

export interface ResponseOption {
  /**
   * Takes an response data type.
   * Example: GetUserResponseDto
   */
  model: Type<any>;

  /**
   * Specifies the title for the example.
   */
  exampleTitle: string;

  /**
   * Describes the scenario in which the response occurs.
   * ex) 'when user get self information, this response will be returned'
   */
  exampleDescription: string;

  /**
   * If you want to overwrite the value of the response, you can use this.
   * but this will be performed only 1st level of object.
   * ex) { id: 1, name: 'John Doe' }
   */
  overwriteValue?: Record<string, any>;

  /**
   * if you want to use generic from model props, you can use this
   * ex) UserResponseDto
   */
  generic?: Type<any>;
}
