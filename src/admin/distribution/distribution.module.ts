import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtManagementRepository } from '../artManagement.repository';
import { CategoryRepository } from '../category.repository';
import { DistributionController } from './distribution.controller';
import { DistributionService } from './distribution.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtManagementRepository, CategoryRepository])
  ],
  controllers: [DistributionController],
  providers: [DistributionService]
})
export class DistributionModule {}
