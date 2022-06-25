import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
import { S3Repository } from './s3.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFile } from './entities/s3.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadFile])],
  controllers: [S3Controller],
  providers: [S3Service, S3Repository],
  exports: [S3Service, TypeOrmModule],
})
export class S3Module {}
