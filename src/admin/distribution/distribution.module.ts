import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistRepository } from '../artist.repository';
import { ArtManagementRepository } from '../artManagement.repository';
import { CategoryRepository } from '../category.repository';
import { DistributionController } from './distribution.controller';
import { DistributionService } from './distribution.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtManagementRepository, CategoryRepository, ArtistRepository])
  ],
  controllers: [DistributionController],
  providers: [DistributionService]
})
export class DistributionModule {}
