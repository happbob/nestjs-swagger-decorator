// Purpose: Type definition for the OK response object.
import { ApiResponseMetadata, ApiResponseSchemaHost } from '@nestjs/swagger';

export interface ResponseType
  extends ApiResponseMetadata,
    ApiResponseSchemaHost {}
