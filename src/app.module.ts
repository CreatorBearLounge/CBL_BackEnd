import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtManagementModule } from './admin/artManagement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfoModule } from './Client/info/info.module';
import { ShopModule } from './Client/shop/shop.module';
import { typeORMConfig } from './config/typeorm.config';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ArtManagementModule,
    ShopModule,
    InfoModule,
    S3Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
