import { Module } from '@nestjs/common';
import { ServicesService } from './services/services.service';
import { ControllersController } from './controllers/controllers.controller';

@Module({
  providers: [ServicesService],
  controllers: [ControllersController]
})
export class AnalyticsModule {}
