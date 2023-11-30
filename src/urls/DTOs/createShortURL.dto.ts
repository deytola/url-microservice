import {IsNotEmpty} from 'class-validator';

export class createShortURLDTO {
    @IsNotEmpty()
    longURL: string;
}