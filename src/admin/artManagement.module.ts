import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtManagementService } from './artManagement.service';
import { ArtManagementRepository } from './artManagement.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ArtManagementController } from './artManagement.controller';
import { ArtistRepository } from './artist.repository';
import { DistributionModule } from './distribution/distribution.module';
import { CategoryRepository } from './category.repository';
import { ShopService } from 'src/Client/shop/shop.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([ArtManagementRepository, ArtistRepository, CategoryRepository]), NestjsFormDataModule, DistributionModule
  ],
  controllers: [ArtManagementController],
  providers: [ArtManagementService, ShopService]
})
export class ArtManagementModule {}
