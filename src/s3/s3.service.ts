import { Req, Res, Injectable, BadRequestException } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { S3Repository } from './s3.repository';
import { UploadFile } from './Entity';

const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId : "AKIAQH7TEEIYLN3UU254",
  secretAccessKey: "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",
  region: "ap-northeast-2"
});

// AWS_S3_BUCKET_NAME= "s3cbl"
// AWS_ACCESS_KEY_ID= "AKIAQH7TEEIYLN3UU254"
// AWS_SECRET_ACCESS_KEY= "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"
// AWS_REGION= "ap-northeast-2"


@Injectable()
export class S3Service {
  constructor(private readonly s3Repository: S3Repository) {}
  async uploadImage(files: Express.Multer.File[]) { 
    const uploadFiles = [];
    for(const element of files) {
      const file = new UploadFile();
      file.originalName =element.originalname;
      file.encoding = element.encoding;
      file.mimeType = element.mimetype;
      file.size = element.size;
      file.url = element.path;
      file.buffer = element.buffer;

      uploadFiles.push(file);
    }
    console.log(uploadFiles)

    try{
      return {data: await this.s3Repository.save(uploadFiles)};

    } catch(error) {
      throw new BadRequestException(error.message);
    }
  }
}