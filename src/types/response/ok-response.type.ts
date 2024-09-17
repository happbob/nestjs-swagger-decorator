import { ApiResponseMetadata, ApiResponseSchemaHost } from '@nestjs/swagger';

export interface ResponseType extends ApiResponseMetadata {
  schema?: ApiResponseSchemaHost['schema']; // schema 필드를 선택적으로 재정의
}
