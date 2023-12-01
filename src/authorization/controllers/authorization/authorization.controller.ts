import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginDTO } from 'src/authorization/DTOs/UserLogin.dto';
import { AuthorizationService } from 'src/authorization/services/authorization/authorization.service';



@ApiTags('Auth')
@Controller('auth')
export class AuthorizationController {
    constructor(private authService: AuthorizationService) {

    }

    @ApiOperation({ summary: 'Login to URL Shortener Microservice' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: "ade@test.test",
                    description: 'user\'s unique email'
                },
                password: {
                    type: 'string',
                    example: "Test%$#",
                    description: 'user\'s unique email'
                },
            }

        }
    })
    @ApiResponse({
        status: 200,
        description: 'user login successful',
        schema: {
            type: 'object',
            properties: {
                token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJlbWFpbCI6ImRhZkBkYWVydHIuY2MiLCJsYXN0TG9naW5EYXRlIjoiMjAyMy0xMS0zMFQxOToxMjozMy43NTBaIiwiY3JlYXRlZEF0IjoiMjAyMy0xMS0zMFQxNzo0NTowNi44ODNaIiwidXBkYXRlZEF0IjoiMjAyMy0xMS0zMFQxNzo0Njo1MC41NzNaIiwic3ViIjoyMSwiaWF0IjoxNzAxMzcxNTUzLCJleHAiOjE3MDE0NTc5NTN9.FsuaZk2kY6t2GWU7I2k_N1ONCDBCZnhTaud_eoEqQAw',
                    description: 'user\'s access token'
                },
                user: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                            description: 'user\'s unique identifier'

                        },
                        firstName: {
                            type: 'string',
                            example: 'Bruce',
                            description: 'user\'s given name'
                        },
                        lastName: {
                            type: 'string',
                            example: 'Wayne',
                            description: 'user\'s family name'
                        },
                        email: {
                            type: 'string',
                            example: "ade@test.test",
                            description: 'user\'s unique email'
                        },
                        lastLoginDate: {
                            type: 'date',
                            example: "2023-11-30",
                            description: 'user\'s last login date'
                        },
                        createdAt: {
                            type: 'date',
                            example: "2023-11-302023-11-30 10:45:06.883885",
                            description: 'user\'s account creation date'
                        },
                        updatedAt: {
                            type: 'date',
                            example: "2023-11-302023-11-30 10:45:06.883885",
                            description: 'user\'s account creation date'
                        },
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request',
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Invalid credentials',
                    description: 'error message'

                },
                error: {
                    type: 'string',
                    example: 'Bad request',
                    description: 'http error message'
                },
                statusCode: {
                    type: 'integer',
                    example: 400,
                    description: 'HTTP status code'
                }
            }
        }
    })
    @Post('login')
    @HttpCode(200)
    login(@Body() userLoginDTO: UserLoginDTO): any {
        return this.authService.login(userLoginDTO);
    }




}
