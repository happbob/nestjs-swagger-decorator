# nestjs-swagger-decorator

---

> Minimal swagger decorator for NestJS

<span>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/>
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=NestJS&logoColor=white"/>
    <img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=Swagger&logoColor=black"/>
    <a href="https://www.npmjs.com/package/nestjs-swagger-decorator">
        <img src="https://img.shields.io/npm/dt/nestjs-swagger-decorator">
    </a>
    <a href="https://github.com/happbob/nestjs-swagger-decorator">
        <img src="https://img.shields.io/github/stars/happbob/nestjs-swagger-decorator?style=social">
    </a>
</span>

## How to install

```bash
npm i nestjs-swagger-decorator
# or
yarn add nestjs-swagger-decorator
```

<br/>

## Old usage

```ts
// Too many Lines...
@ApiResponse({
    status: 1000,
    description: 'success',
    type: GetUsersResponse,
  })
@ApiResponse({
    status: 2000,
    description: 'no authority',
  })
@ApiResponse({
    status: 2013,
    description: 'no users exists.',
  })
@ApiResponse({
    status: 2016,
    description: 'no admin authority',
  })
@ApiResponse({
    status: 4000,
    description: 'server error',
  })
@ApiResponse({
    status: 4001,
    description: 'DB Connection error',
  })
@ApiOperation({ summary: '[Admin] get users api' })
async getUsers(@Headers('x-access-token') jwt, @Request() req){
}
```

<br/>

## New usage (nestjs-swagger-decorator)

```ts
// domain.controller.ts
import {GetDomainSwagger} from "./domain.swagger";

@GetDomainSwagger('get domains api')
async getProjectType(@Headers('x-access-token') jwt, @Request() req){
}
```

```ts
// domain.swagger.ts
import { BaseSwaggerDecorator } from 'nestjs-swagger-decorator';
import { applyDecorators } from '@nestjs/common';

export function GetDomainSwagger(apiSummary) {
  return BaseSwaggerDecorator(
    apiSummary,
	// Swagger Operations
    [
      ApiOkResponse({description: 'OK'}),
	  ApiCreatedResponse({description: 'created'})
    ],
    // Cutsom response operation props
    [
      {
        status: 200,
        description: 'Custom Response Description'
        type: GetDomainResponse,
      },
    ],
  );
}
```

### You can find more Response Operations at [here](https://docs.nestjs.com/openapi/operations#responses)

<br/>

## Recommend Usage

```ts
// domain.controller.ts
import {GetDomainSwagger} from "./domain.swagger";

@GetDomainSwagger('get domains api')
async getProjectType(@Headers('x-access-token') jwt, @Request() req){
}
```

```ts
// domain.swagger.ts
import { BaseSwaggerDecorator } from 'nestjs-swagger-decorator';
import { applyDecorators } from '@nestjs/common';
import { response } from '{response file location}';

export function GetOutsourceWorkerRecruitmentSwagger(apiSummary) {
  return BaseSwaggerDecorator(
    apiSummary,
    [
      ApiOkResponse({ description: 'OK' }),
      ApiCreatedResponse({ description: 'created' }),
    ],
    [
      { ...response.CHECK_JWT_TOKEN },
      { ...response.SUCCESS, type: GetDomainResponse },
    ],
  );
}
```

```ts
export const response = {
  SUCCESS: {
	status: 200
    description: 'success',
  },
  CHECK_JWT_TOKEN: {
	status: 401
    description: 'jwt token invalid',
  },
  USER_ID_EMPTY: {
	status: 404
    description: 'not found User id',
  },
	...
};
```

<br/>
