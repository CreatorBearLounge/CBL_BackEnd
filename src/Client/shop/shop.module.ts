import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ArtistRepository } from 'src/admin/artist.repository';
import { ArtManagementRepository } from 'src/admin/artManagement.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtManagementRepository, ArtistRepository]), NestjsFormDataModule
  ],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule {}
