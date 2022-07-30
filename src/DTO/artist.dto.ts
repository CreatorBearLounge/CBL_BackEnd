import { IsString } from "class-validator";

export class ArtistDto {

    @IsString() 
    name: string; // 작가 이름

    @IsString() 
    description: string; // 작가 소개

    @IsString() 
    resume: string; // 작가 이력

    // @IsFile()
    // @MaxFileSize(1e6)
    // @HasMimeType(['image/jpeg', 'image/png'])
    // thumbnail: FileSystemStoredFile;

    @IsString()
    profile: string;


}

