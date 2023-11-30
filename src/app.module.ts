import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, AuthorizationModule, ConfigModule.forRoot({}), DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
