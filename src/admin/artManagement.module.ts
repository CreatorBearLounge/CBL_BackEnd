import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtManagementService } from './artManagement.service';
import { ArtManagementRepository } from './artManagement.repository';
import { ArtManagementController } from './artManagement.controller';
import { ArtistRepository } from './artist.repository';
import { ShopService } from 'src/Client/shop/shop.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { S3Repository } from './s3.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtManagementRepository, ArtistRepository, S3Repository]), NestjsFormDataModule
  ],
  controllers: [ArtManagementController],
  providers: [ArtManagementService, ShopService],
  exports: [],
})
export class ArtManagementModule {}
