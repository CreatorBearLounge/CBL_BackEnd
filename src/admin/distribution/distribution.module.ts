import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtRepository } from 'src/Repository/art.repository';
import { ArtistRepository } from 'src/Repository/artist.repository';
import { CategoryRepository } from '../../Repository/category.repository';
import { DistributionController } from './distribution.controller';
import { DistributionService } from './distribution.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtRepository, CategoryRepository, ArtistRepository])
  ],
  controllers: [DistributionController],
  providers: [DistributionService]
})
export class DistributionModule {}
