import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsString } from "class-validator";
export class ArtManagementDto {

    @ApiProperty({description: "작품 제목"})
    @IsString() 
    title: string;

    @ApiProperty({description: "작품 카테고리 아이디"})
    @IsInt() 
    categoryId: number;

    @ApiProperty({description: "작가 아이디"})
    @IsInt() 
    artistId: number;

    @ApiProperty({description: "작품 등록일"})
    @IsDate()
    date: Date;

    @ApiProperty({description: "작품 소개"})
    @IsString() 
    description: string;

    @ApiProperty({description: "작품 조회수"})
    @IsInt()
    viewCount: number;

    @ApiProperty({description: "작품 다운로드 회수"})
    @IsInt()
    downloadCount: number;

    @ApiProperty({description: "작품 다운로드 한 사용자 목록"})
    downloadUserId: number[];
    
    @ApiProperty({description: "작품 썸네일"})
    @IsString()
    thumbnail: string;

    @ApiProperty({description: "작품 다운fhem url"})
    @IsString()
    downloadUrl: string;
}