import { Module } from '@nestjs/common';
import { AuthorizationController } from './controllers/authorization/authorization.controller';
import { AuthorizationService } from './services/authorization/authorization.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import {JwtModule} from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthorizationGuard } from './guards/authorization.guard';
import { Role } from 'src/users/entities/role.entity';


@Module({
  imports:[JwtModule.register({
    global: true,
    secret: `${process.env.JWT_SECRET}`,
    signOptions: {expiresIn: '1d'},
  }), 
  PassportModule,
  TypeOrmModule.forFeature([User, Role]),
],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, ConfigService, LocalStrategy, UsersService],
  exports: [AuthorizationService]
})
export class AuthorizationModule {}
