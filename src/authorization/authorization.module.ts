import { Module } from '@nestjs/common';
import { AuthorizationController } from './controllers/authorization/authorization.controller';
import { AuthorizationService } from './services/authorization/authorization.service';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import {JwtModule, JwtService} from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';


@Module({
  imports:[JwtModule.register({
    global: true,
    secret: 'test',
    signOptions: {expiresIn: '60s'},
  }), 
  PassportModule,
  TypeOrmModule.forFeature([User])
],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, ConfigService, LocalStrategy, UsersService],
  exports: [AuthorizationService]
})
export class AuthorizationModule {}
