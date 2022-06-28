import { Type } from "class-transformer";
import { IsDate, IsInt, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class ArtManagementDto {

    @IsString() 
    title: string;

    @IsInt()
    category: number;

    @IsInt() 
    artist: number;

//    @Type(()=>Date)
    @IsDate()
    date: Date;

    @IsString() 
    description: string;

    @IsInt()
    viewCount: number;

    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png'])
    thumbnail: FileSystemStoredFile;
}

