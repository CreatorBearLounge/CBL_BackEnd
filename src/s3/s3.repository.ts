import { EntityRepository, Repository } from "typeorm";
import { UploadFile } from "./entities/s3.entity";

@EntityRepository(UploadFile)
export class S3Repository extends Repository<UploadFile> {}