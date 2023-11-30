import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDTO } from 'src/authorization/DTOs/UserLogin.dto';
import { AuthorizationService } from 'src/authorization/services/authorization/authorization.service';

@Controller('auth')
export class AuthorizationController {
    constructor(private authService: AuthorizationService){

    }

    @Post('login')
    login(@Body() userLoginDTO: UserLoginDTO): any {
        return this.authService.login(userLoginDTO);
    }


    
    
}
