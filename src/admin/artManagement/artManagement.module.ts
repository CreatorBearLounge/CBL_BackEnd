import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtManagementService } from './artManagement.service';
import { ArtManagementController } from './artManagement.controller';
import { ShopService } from 'src/Client/shop/shop.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ArtistRepository } from 'src/Repository/artist.repository';
import { S3Repository } from 'src/Repository/s3.repository';
import { CategoryRepository } from 'src/Repository/category.repository';
import { DistributionService } from '../distribution/distribution.service';
import { ArtRepository } from 'src/Repository/art.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtRepository, ArtistRepository, S3Repository, CategoryRepository]), NestjsFormDataModule
  ],
  controllers: [ArtManagementController],
  providers: [ArtManagementService, ShopService, DistributionService],
  exports: [],

})
export class ArtManagementModule {}
