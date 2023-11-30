import { IsEmail, IsNotEmpty, IsDate } from 'class-validator';
import { Url } from 'src/urls/entities/url.entity';

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;
  
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;

  lastLoginDate?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}
