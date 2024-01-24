import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortURLDTO } from '../../DTOs/shortURL.dto';
import { Url } from '../../entities/url.entity';
import { UsersService } from '../../../users/services/users/users.service';
import {
  detectDeviceType,
  detectOperatingSystem,
} from '../../utils/user-agent';
import { Analytics } from '../../../analytics/entities/analytics.entity';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
    @InjectRepository(Analytics)
    private analyticsRepository: Repository<Analytics>,
    private readonly usersService: UsersService,
  ) {}

  async shortenURL(createShortURLDTO: ShortURLDTO): Promise<{ url: string }> {
    if (!this.isURLValid(createShortURLDTO.longURL)) {
      throw new BadRequestException('Invalid URL');
    }
    const savedUser = await this.usersService.findOne(createShortURLDTO.userID);

    if (!savedUser) {
      throw new BadRequestException('Invalid User');
    }
    const shortenedUrl: string = this.generateShortenedURL();
    const url = this.urlRepository.create({
      originalUrl: createShortURLDTO.longURL,
      shortenedUrl,
      user: savedUser,
    });
    await this.urlRepository.save(url);

    const { deviceType, deviceOS } = this.getUserDeviceDetails(
      createShortURLDTO.userAgent,
    );
    const analyticsPayload: Analytics = this.analyticsRepository.create({
      deviceType,
      osType: deviceOS,
      shortenedUrl,
      ipAddress: createShortURLDTO.ipAddress,
    });

    await analyticsPayload.save();

    return { url: shortenedUrl };
  }

  private isURLValid(url: string): boolean {
    return /^(https?|ftp):\/\/(?:www\.)?[^\s/$.?#]+\.[^\s/$.?#]{2,}.*$/.test(
      url,
    );
  }

  private generateShortenedURL(): string {
    return `https://${this.generateRandonString()}.ai`;
  }

  private generateRandonString(): string {
    return Math.random().toString(36).slice(2);
  }

  private getUserDeviceDetails(userAgent: string): {
    deviceType: string;
    deviceOS: string;
    country?: string;
    city?: string;
  } {
    const deviceType = detectDeviceType(userAgent);
    const deviceOS = detectOperatingSystem(userAgent);
    return {
      deviceType,
      deviceOS,
    };
  }
}
