import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Analytics } from 'src/analytics/entities/analytics.entity';
import { ShortURLDTO } from 'src/urls/DTOs/shortURL.dto';
import { Url } from 'src/urls/entities/url.entity';
import { UsersService } from 'src/users/services/users/users.service';
import { detectDeviceType, detectOperatingSystem } from 'src/urls/utils/user-agent';

@Injectable()
export class UrlsService {

    constructor(
        @InjectRepository(Url)
        private urlRepository: Repository<Url>,
        @InjectRepository(Analytics)
        private analyticsRepository: Repository<Analytics>,
        private readonly usersService: UsersService){

    }

    async shortenURL(createShortURLDTO: ShortURLDTO): Promise<{url: string}>{
        if(!this.isURLValid(createShortURLDTO.longURL)){
            throw new BadRequestException('Invalid URL');
        }
        const savedUser = await this.usersService.findOne(createShortURLDTO.userID);

        if(!savedUser){
            throw new BadRequestException('Invalid User');
        }
        const shortenedUrl: string  =  this.generateShortenedURL();
        const url = this.urlRepository.create({
            originalUrl: createShortURLDTO.longURL,
            shortenedUrl,
            user: savedUser
        });
        await this.urlRepository.save(url);

        const {deviceType, deviceOS} = this.getUserDeviceDetails(createShortURLDTO.userAgent);
        const analyticsPayload: Analytics = this.analyticsRepository.create({
            deviceType,
            osType: deviceOS,
            shortenedUrl,
            ipAddress: createShortURLDTO.ipAddress
        });
        
        await analyticsPayload.save();

        return {url: shortenedUrl};
    }

    private isURLValid(url: string): boolean{
        return /^(https?|ftp):\/\/(?:www\.)?[^\s/$.?#]+\.[^\s/$.?#]{2,}.*$/.test(url);
    }

    
    private generateShortenedURL(): string{
        return `https://${this.generateRandonString()}.ai`;
    }

    private generateRandonString(): string{
        return Math.random().toString(36).slice(2);
    }

    private getUserDeviceDetails(userAgent: string) : {deviceType: string, deviceOS: string, country?: string, city?: string}{
        const deviceType = detectDeviceType(userAgent);
        const deviceOS = detectOperatingSystem(userAgent);
        return {
            deviceType,
            deviceOS
        }
    }
}
