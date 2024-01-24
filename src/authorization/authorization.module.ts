import { Module } from '@nestjs/common';
import { AuthorizationController } from './controllers/authorization/authorization.controller';
import { AuthorizationService } from './services/authorization/authorization.service';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../users/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/services/users/users.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
    TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, ConfigService, LocalStrategy, UsersService],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
