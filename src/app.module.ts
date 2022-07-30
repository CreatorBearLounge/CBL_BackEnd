import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './Client/shop/shop.module';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ShopModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
