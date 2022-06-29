import { Module } from '@nestjs/common';
import { DistributionController } from './distribution.controller';
import { DistributionService } from './distribution.service';

@Module({
  controllers: [DistributionController],
  providers: [DistributionService]
})
export class DistributionModule {}
