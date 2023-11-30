import {IsNotEmpty} from 'class-validator';

export class ShortURLDTO {
    @IsNotEmpty()
    longURL: string;

    @IsNotEmpty()
    userID: number;

    ipAddress: string;

    userAgent: string;
}