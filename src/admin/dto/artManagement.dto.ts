import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class ArtManagementDto {

    @IsString() 
    title: string;

    @IsString() 
    category: string;

    @IsString() 
    artist: string;

//    @Type(()=>Date)
    @IsDate()
    date: Date;

    @IsString() 
    description: string;

    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png'])
    thumbnail: FileSystemStoredFile;
}

