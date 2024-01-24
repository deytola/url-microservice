import { Module } from '@nestjs/common';
import { UrlsController } from './controllers/urls/urls.controller';
import { UrlsService } from './services/urls/urls.service';
import { Url } from './entities/url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/services/users/users.service';
import { User } from '../users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Analytics } from '../analytics/entities/analytics.entity';
import { Role } from '../users/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Url, User, Analytics, Role]),
    ConfigModule.forRoot(),
  ],
  controllers: [UrlsController],
  providers: [UrlsService, UsersService],
})
export class UrlsModule {}
