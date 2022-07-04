import { Type } from "class-transformer";
import { IsDate, IsInt, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";
import { isInt32Array } from "util/types";

export class ArtManagementDto {

    @IsString() 
    title: string;

    @IsInt() 
    categoryId: number;

    @IsInt() 
    artistId: number;

    // @Type(()=>Date)
    @IsDate()
    date: Date;

    @IsString() 
    description: string;

    @IsInt()
    viewCount: number;

    @IsInt()
    downloadCount: number;

    downloadUserId: number[];
    
    @IsString()
    thumbnail: string;
}