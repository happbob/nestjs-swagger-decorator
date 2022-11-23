# nestjs-swagger-decorator

---

> The greatest swagger decorator for NestJS

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

---

```bash
npm i nestjs-swagger-decorator
```

## Old usage

---

```tsx
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

## New usage (nestjs-swagger-decorator)

---

```tsx
import {UserSwagger} from "./user.swagger";

@UserSwagger('[Admin] get users api')
async getProjectType(@Headers('x-access-token') jwt, @Request() req){
}
```

```tsx
import { ApiHeader, ApiParam, ApiQuery } from "@nestjs/swagger";
import {BaseSwaggerDecorator} from "nestjs-swagger-decorator";
import { applyDecorators } from "@nestjs/common";

export function GetOutsourceWorkerRecruitmentSwagger(apiSummary){
    return 
        BaseSwaggerDecorator(
            apiSummary,
            [{
               isSuccess: false,
               code: 1000,
               message: 'success',
               type: GetUsersResponse
            }],
            [{
                isSuccess: false, 
                code: 2000,
                message: 'no authority'
            }, {
                isSuccess: false,
                code: 2013,
                message: 'no users exists.'
            }, {
                isSuccess: false,
                code: 2016,
                message: 'no admin authority'
            }, {
                isSuccess: false,
                code: 4000,
                message: 'server error'
            }, {
                isSuccess: false,
                code: 4001,
                message: 'DB Connection error'
            }]
        );
}
```

## Shorter Usage

---

```tsx
import {UserSwagger} from "./user.swagger";

@UserSwagger('[Admin] get users api')
async getProjectType(@Headers('x-access-token') jwt, @Request() req){
}
```

```tsx
import { ApiHeader, ApiParam, ApiQuery } from "@nestjs/swagger";
import {BaseSwaggerDecorator} from "nestjs-swagger-decorator";
import { applyDecorators } from "@nestjs/common";
import { response } from "{response file location}";

export function GetOutsourceWorkerRecruitmentSwagger(apiSummary){
    return 
        BaseSwaggerDecorator(
            apiSummary,
            [{
               ...respone.SUCCESS,
               type: GetUsersResponse
            }],
            [
                response.CHECK_JWT_TOKEN,
                response.USER_ID_EMPTY,
                response.CHECK_ADMIN_JWT_TOKEN,
                response.ERROR,
                response.DB_ERROR,
            ]
        );
}
```

```tsx
export const response = {
    SUCCESS: {
        isSuccess: true,
        code: 1000,
        message: 'success',
    }, CHECK_JWT_TOKEN: {
        isSuccess: false,
        code: 2000,
        message: 'no authority'
    }, USER_ID_EMPTY: {
        isSuccess: false,
        code: 2013,
        message: 'no users exists.',
    }, CHECK_ADMIN_JWT_TOKEN: {
        isSuccess: false,
        code: 2016,
        message: 'no admin authority',
    }, ERROR: {
        isSuccess: false,
        code: 4000,
        message: 'Server error',
    }, DB_ERROR: {
        isSuccess: false,
        code: 4001,
        message: 'DB Connection error',
    },
}
```

## BaseSwaggerDecorator Type

---

```tsx
const BaseSwaggerDecorator = (apiSummary: string, successResponseList: ResponseT[], validationList: ResponseT[]) => {
}
```

```tsx
export interface ResponseT {
    // success or not
    // ex) true
    isSuccess: boolean,

    // api status code
    // ex) 1000
    code: number,

    // describe api result
    // ex) Missing Category Id.
    message: string,

    // deliver result data object
    result?: any,

    // check result type
    type?: any
}
```