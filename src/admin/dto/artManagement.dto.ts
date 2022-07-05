import { IsDate, IsInt, IsString } from "class-validator";
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