import { EntityRepository, Repository } from "typeorm";
import { UploadFile } from "./Entity";

@EntityRepository(UploadFile)
export class S3Repository extends Repository<UploadFile> {}