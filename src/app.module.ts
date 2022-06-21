import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtManagementModule } from './admin/artManagement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './config/typeorm.config';
import { ShopModule } from './client/shop/shop.module';
import { InfoModule } from './client/info/info.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ArtManagementModule,
    ShopModule,
    InfoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
