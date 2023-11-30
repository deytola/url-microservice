import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';

import { UserLoginDTO } from "../DTOs/UserLogin.dto";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'test'
        });
    }

    async validate(username: string, password: string): Promise<any> {
        return 'suceeess';
    }

}