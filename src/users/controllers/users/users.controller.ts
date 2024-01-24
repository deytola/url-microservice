import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../../DTOs/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          example: 'Bruce',
          description: "user's given name",
        },
        lastName: {
          type: 'string',
          example: 'Wayne',
          description: "user's family name",
        },
        email: {
          type: 'string',
          example: 'ade@test.test',
          description: "user's unique email",
        },
        password: {
          type: 'string',
          example: 'Test%$#',
          description: "user's unique email",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'user created successfully',
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJlbWFpbCI6ImRhZkBkYWVydHIuY2MiLCJsYXN0TG9naW5EYXRlIjoiMjAyMy0xMS0zMFQxOToxMjozMy43NTBaIiwiY3JlYXRlZEF0IjoiMjAyMy0xMS0zMFQxNzo0NTowNi44ODNaIiwidXBkYXRlZEF0IjoiMjAyMy0xMS0zMFQxNzo0Njo1MC41NzNaIiwic3ViIjoyMSwiaWF0IjoxNzAxMzcxNTUzLCJleHAiOjE3MDE0NTc5NTN9.FsuaZk2kY6t2GWU7I2k_N1ONCDBCZnhTaud_eoEqQAw',
          description: "user's access token",
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
              description: "user's unique identifier",
            },
            firstName: {
              type: 'string',
              example: 'Bruce',
              description: "user's given name",
            },
            lastName: {
              type: 'string',
              example: 'Wayne',
              description: "user's family name",
            },
            email: {
              type: 'string',
              example: 'ade@test.test',
              description: "user's unique email",
            },
            createdAt: {
              type: 'date',
              example: '2023-11-302023-11-30 10:45:06.883885',
              description: "user's account creation date",
            },
            updatedAt: {
              type: 'date',
              example: '2023-11-302023-11-30 10:45:06.883885',
              description: "user's account creation date",
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'array',
          example: ['password should not be empty'],
          description: 'error message',
        },
        error: {
          type: 'string',
          example: 'Bad request',
          description: 'http error message',
        },
        statusCode: {
          type: 'integer',
          example: 400,
          description: 'HTTP status code',
        },
      },
    },
  })
  @Post()
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDTO) {
    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      12,
    );
    return this.usersService.create(
      Object.assign(createUserDto, { password: hashedPassword }),
    );
  }
}
