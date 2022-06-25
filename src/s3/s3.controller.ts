import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { FilesInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import 'dotenv/config';


const s3 = new AWS.S3();

@Controller('s3')
export class S3Controller {
  constructor(
    private readonly s3Service: S3Service,
    ) {}


  @Post()
  @UseInterceptors(FilesInterceptor("file", 10, {
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
      }
    })
  }))
  
  async uploadFile(@UploadedFiles() files: Express.Multer.File[], @Req() request, @Res() response) {
    
    return this.s3Service.uploadImage(files, request, response);
  }



  

}
