import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ArtManagementService } from 'src/admin/artManagement/artManagement.service';
import { S3Repository } from 'src/Repository/s3.repository';
import { CategoryRepository } from 'src/Repository/category.repository';
import { ArtRepository } from 'src/Repository/art.repository';
import { ArtistRepository } from 'src/Repository/artist.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtRepository, ArtistRepository, S3Repository, CategoryRepository]), NestjsFormDataModule

  ],
  controllers: [ShopController],
  providers: [ShopService, ArtManagementService ]
})
export class ShopModule {}
