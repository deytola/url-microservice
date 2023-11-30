import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { CreateUserDTO } from 'src/users/DTOs/CreateUser.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ){}

    async create(createUserDto: CreateUserDTO): Promise<any> {

        const foundUser = await this.findOneByEmail(createUserDto.email)
        if(!foundUser){
            const user = new User();
            user.firstName = createUserDto.firstName;
            user.lastName = createUserDto.lastName;
            user.email = createUserDto.email;
            user.password = createUserDto.password;
            const savedUser = await this.userRepository.save(user);
            return {
                token: this.jwtService.sign({user: savedUser, sub: savedUser.id}),
                user
            }
        }else{
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
