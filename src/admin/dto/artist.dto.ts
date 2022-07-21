import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ArtistDto {

    @ApiProperty({description: "작가 이름"})
    @IsString() 
    name: string; // 작가 이름

    @ApiProperty({description: "작가 소개"})
    @IsString() 
    description: string; // 작가 소개

    @ApiProperty({description: "작가 이력"})
    @IsString() 
    resume: string; // 작가 이력

    // @IsFile()
    // @MaxFileSize(1e6)
    // @HasMimeType(['image/jpeg', 'image/png'])
    // thumbnail: FileSystemStoredFile;

    @ApiProperty({description: "작가 프로필 이미지"})
    @IsString()
    profile: string;
}

