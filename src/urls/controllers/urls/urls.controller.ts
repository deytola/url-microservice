import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { AuthorizationGuard } from 'src/authorization/guards/authorization.guard';
import { createShortURLDTO } from 'src/urls/DTOs/createShortURL.dto';
import { UrlsService } from 'src/urls/services/urls/urls.service';

@Controller('urls')
export class UrlsController {
    constructor(private urlService: UrlsService){

    }
    
    @UseGuards(AuthorizationGuard)
    @Post('short')
    async createShortURL(@Request() req, @Body() createShortURLDTO: createShortURLDTO, @RealIP() ipAddress: string): Promise<{url: string}>{
        const {id} = req.user;
        const userAgent = req.headers['user-agent'];
        return await this.urlService.shortenURL({...createShortURLDTO, userID: id, ipAddress, userAgent})
    }
}
