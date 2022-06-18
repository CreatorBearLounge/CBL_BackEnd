import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'cbl.csnv6qgbbdm9.ap-northeast-2.rds.amazonaws.com',
    port: 5432,
    username: 'postgres',
    password: 'creatorbear1',
    database: 'postgres',
    entities: [__dirname + '/../**/*.entity.{js, ts}', __dirname + '/../**/*.repository.{js, ts}'],
    synchronize: true,
}