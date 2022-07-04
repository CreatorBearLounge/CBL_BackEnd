import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ArtistRepository } from 'src/admin/artist.repository';
import { ArtManagementRepository } from 'src/admin/artManagement.repository';
import { ArtManagementService } from 'src/admin/artManagement.service';
import { S3Repository } from 'src/admin/s3.repository';
import { CategoryRepository } from 'src/admin/category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtManagementRepository, ArtistRepository, S3Repository, CategoryRepository]), NestjsFormDataModule

  ],
  controllers: [ShopController],
  providers: [ShopService, ArtManagementService ]
})
export class ShopModule {}
