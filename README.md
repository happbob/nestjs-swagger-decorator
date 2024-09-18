# nestjs-swagger-decorator

Minimal Swagger decorator for NestJS that simplifies complex response handling in your NestJS applications.

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

Install the package via npm or yarn:

```bash
npm i nestjs-swagger-decorator
# or
yarn add nestjs-swagger-decorator
```

<br/>

## Old Swagger Response Approach

Handling multiple ApiResponse decorators can quickly clutter your code:

```ts
@ApiResponse({ status: 200, description: 'Success', type: GetUserResponseDto })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 404, description: 'User not found' })
@ApiOperation({ summary: 'Get User by ID' })
async getUserById(@Param('id') id: string) {
  return this.userService.findById(id);
}
```

This can be tedious and hard to manage as the number of responses grows.

<br/>

## New Approach Using nestjs-swagger-decorator

With nestjs-swagger-decorator, you can streamline the creation of your Swagger documentation:

### Example 1: Basic Usage

```ts
/// user.swagger.ts
import { BaseSwaggerDecorator } from 'nestjs-swagger-decorator';
import { GetUserResponseDto } from './dto/get-user-response.dto';

export function GetUserSwagger() {
  return BaseSwaggerDecorator(
    { summary: 'Get User by ID', description: 'Fetch user by their unique ID' },
    [
      {
        statusCode: 200,
        responseOptions: [
          {
            model: GetUserResponseDto,
            exampleTitle: 'Success Response',
            exampleDescription: 'A valid user response',
          },
        ],
      },
      {
        statusCode: 404,
        responseOptions: [
          {
            model: ErrorResponseDto,
            exampleTitle: 'User Not Found',
            exampleDescription: 'No user found with this ID',
          },
        ],
      },
    ],
  );
}
```

```ts
// user.controller.ts
import { GetUserSwagger } from './user.swagger';

@Get(':id')
@GetUserSwagger()
async getUserById(@Param('id') id: string) {
  return this.userService.findById(id);
}
```

Here, you define your Swagger documentation in a separate file and reuse it across your project, keeping your controller code clean.

<br/>

### Example 2: Handling Multiple Responses

If your API has several response scenarios (e.g., 200, 401, 404), you can handle them more easily using response options:

```ts
// auth.swagger.ts
import { BaseSwaggerDecorator } from 'nestjs-swagger-decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { ErrorResponseDto } from './dto/error-response.dto';

export function LoginSwagger() {
  return BaseSwaggerDecorator(
    { summary: 'User Login', description: 'Authenticate user credentials' },
    [
      {
        statusCode: 200,
        responseOptions: [
          {
            model: LoginResponseDto,
            exampleTitle: 'Successful Login',
            exampleDescription: 'Valid credentials provided',
          },
        ],
      },
      {
        statusCode: 401,
        responseOptions: [
          {
            model: ErrorResponseDto,
            exampleTitle: 'Unauthorized',
            exampleDescription: 'Invalid credentials',
          },
        ],
      },
    ],
  );
}
```

```ts
// auth.controller.ts
import { LoginSwagger } from './auth.swagger';

@Post('login')
@LoginSwagger()
async login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}
```

<br/>

### Example 3: Using a Base Response DTO

When you have a base response format that wraps your data, you can define and reuse it easily:

```ts
// base-response.dto.ts
export class BaseResponseDto<T> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ type: () => T })
  data: T;

  @ApiProperty({ example: 'Request was successful' })
  message: string;
}
```

```ts
// project.swagger.ts
import { BaseSwaggerDecorator } from 'nestjs-swagger-decorator';
import { BaseResponseDto } from './dto/base-response.dto';
import { ProjectDto } from './dto/project.dto';

export function GetProjectSwagger() {
  return BaseSwaggerDecorator({ summary: 'Get Project Details' }, [
    {
      statusCode: 200,
      baseResponseDto: BaseResponseDto,
      responseOptions: [
        {
          model: ProjectDto,
          exampleTitle: 'Project Found',
          exampleDescription: 'Project data returned successfully',
        },
      ],
    },
  ]);
}
```

<br/>

### Example 4: Custom Response Overwriting

You can also customize responses by overwriting values in the response:

```ts
// user.swagger.ts
import { BaseSwaggerDecorator } from 'nestjs-swagger-decorator';
import { GetUserResponseDto } from './dto/get-user-response.dto';

export function GetUserSwagger() {
  return BaseSwaggerDecorator({ summary: 'Get User by ID' }, [
    {
      statusCode: 200,
      responseOptions: [
        {
          model: GetUserResponseDto,
          exampleTitle: 'User Found',
          exampleDescription: 'Valid user response',
          overwriteValue: { name: 'John Doe' },
        },
      ],
    },
    {
      statusCode: 404,
      responseOptions: [
        {
          model: ErrorResponseDto,
          exampleTitle: 'User Not Found',
          exampleDescription: 'No user found with this ID',
          overwriteValue: { message: 'No such user exists' },
        },
      ],
    },
  ]);
}
```

In this case, the response will return a user named “John Doe” in the example.

<br/>

### Conclusion

nestjs-swagger-decorator is designed to keep your code clean and concise while still providing rich Swagger documentation. Whether you’re dealing with multiple responses or need base response formats, this library has you covered.

> Please visit my [github repository](https://github.com/happbob/nestjs-swagger-decorator), and star me!

Special thanks to developer [@ImNM](https://github.com/ImNM) for reference.
