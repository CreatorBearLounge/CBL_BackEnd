import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
import { S3Repository } from './s3.repository';

@Module({
  controllers: [S3Controller],
  providers: [S3Service, S3Repository],
  exports: [S3Service],
})
export class S3Module {}
