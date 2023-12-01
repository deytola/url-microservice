import { Module } from '@nestjs/common';
import { UrlsController } from './controllers/urls/urls.controller';
import { UrlsService } from './services/urls/urls.service';
import { Url } from './entities/url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Analytics } from 'src/analytics/entities/analytics.entity';
import { Role } from 'src/users/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Url, User, Analytics, Role]), ConfigModule.forRoot()],
  controllers: [UrlsController, ],
  providers: [UrlsService, UsersService]
})
export class UrlsModule {}
