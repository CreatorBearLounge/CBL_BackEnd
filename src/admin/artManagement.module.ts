import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtManagementService } from './artManagement.service';
import { ArtManagementRepository } from './artManagement.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ArtManagementController } from './artManagement.controller';
import { ArtistRepository } from './artist.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([ArtManagementRepository, ArtistRepository]), NestjsFormDataModule
  ],
  controllers: [ArtManagementController],
  providers: [ArtManagementService]
})
export class ArtManagementModule {}
