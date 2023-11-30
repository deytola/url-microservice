import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UrlsModule } from './urls/urls.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [UsersModule, AuthorizationModule, ConfigModule.forRoot({}), DatabaseModule, UrlsModule, AnalyticsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
