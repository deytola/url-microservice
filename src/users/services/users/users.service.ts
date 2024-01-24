import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/users/DTOs/CreateUser.dto';
import { Repository } from 'typeorm';
import { RoleName } from '../../constants/roles.contants';
import { Role } from '../../entities/role.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<any> {
    const foundUser = await this.findOneByEmail(createUserDto.email);
    if (!foundUser) {
      const user = new User();
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      const savedUser = await this.userRepository.save(user);
      const defaultRole = this.rolesRepository.create({
        name: RoleName.USER,
        user,
      });
      await defaultRole.save();
      user.roles = [defaultRole];
      await savedUser.save();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = savedUser;
      return {
        token: this.jwtService.sign({
          ...userWithoutPassword,
          sub: savedUser.id,
        }),
        user: userWithoutPassword,
      };
    } else {
      throw new BadRequestException('User email already exists');
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
