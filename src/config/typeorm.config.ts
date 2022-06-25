import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import 'dotenv/config';

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    // host: 'cbl.csnv6qgbbdm9.ap-northeast-2.rds.amazonaws.com',
    port: parseInt(process.env.PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js, ts}', __dirname + '/../**/*.repository.{js, ts}'],
    synchronize: true,
    logging : true,
}