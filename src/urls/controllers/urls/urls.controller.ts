import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RealIP } from 'nestjs-real-ip';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createShortURLDTO } from '../../DTOs/createShortURL.dto';
import { AuthorizationGuard } from '../../../authorization/guards/authorization.guard';
import { UrlsService } from '../../services/urls/urls.service';
import { RoleName } from '../../../users/constants/roles.contants';
import { RolesGuard } from '../../../authorization/roles/roles.guard';

@ApiBearerAuth()
@ApiTags('URLs')
@Controller('urls')
export class UrlsController {
  constructor(private urlService: UrlsService) {}

  @ApiOperation({ summary: 'Create a shortened URL' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        longURL: {
          type: 'string',
          example: 'https://www.africadaertr.cc',
          description: "user's long URL to be shortened",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'shortened URL created successfully',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          example: 'https://skr3gb2g9ui.ai',
          description: "user's shortened url",
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden Request',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Insufficient Roles',
          description: 'error message',
        },
        error: {
          type: 'string',
          example: 'Forbidden',
          description: 'http error message',
        },
        statusCode: {
          type: 'integer',
          example: 403,
          description: 'HTTP status code',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Unauthorized',
          description: 'error message',
        },
        statusCode: {
          type: 'integer',
          example: 401,
          description: 'HTTP status code',
        },
      },
    },
  })
  @UseGuards(AuthorizationGuard, RolesGuard)
  @SetMetadata('roles', [RoleName.USER])
  @Post('short')
  @HttpCode(201)
  async createShortURL(
    @Request() req,
    @Body() createShortURLDTO: createShortURLDTO,
    @RealIP() ipAddress: string,
  ): Promise<{ url: string }> {
    const { id } = req.user;
    const userAgent = req.headers['user-agent'];
    return await this.urlService.shortenURL({
      ...createShortURLDTO,
      userID: id,
      ipAddress,
      userAgent,
    });
  }
}
