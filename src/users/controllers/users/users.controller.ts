import { Body, Controller, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/DTOs/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}


  @Post()
  async createUser(@Body() createUserDto: CreateUserDTO) {
    const hashedPassword: string = await bcrypt.hash(createUserDto.password, 12);
    return this.usersService.create(Object.assign(createUserDto, {password: hashedPassword}));
  }
}
