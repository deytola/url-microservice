import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import {Strategy} from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(){
        super();
    }
    async validate(username: any, password: any): Promise<any> {
        return 'success';
    }

}