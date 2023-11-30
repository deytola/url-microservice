import {IsNotEmpty} from 'class-validator';

export class getLongURLDTO {
    @IsNotEmpty()
    shortURL: string;
}