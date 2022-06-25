import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { S3Service } from './s3.service';
import * as dotenv from 'dotenv';
dotenv.config();

// 참고: https://velog.io/@suasue/NestJS-AWS-S3-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C, https://codesk.tistory.com/61
// 참고: https://wanago.io/2020/08/03/api-nestjs-uploading-public-files-to-amazon-s3/
// const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

const s3 = new AWS.S3();

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @UseInterceptors(FilesInterceptor("file", 10, {
    storage: multerS3({
      s3: s3,
      bucket: "s3cbl",
      // bucket: process.env.AWS_S3_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read-write',
      key: function (req, file, cb) {
        // cb(null, `${Date.now().toString()}-${file.originalname}`);
        cb(null, file.originalname);
      }
    })
  }))
  
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[]) {

    return this.s3Service.uploadImage(files);
  }
   
  

}
