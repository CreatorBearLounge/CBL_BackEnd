import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CategoryDto {

    @ApiProperty({description: "카테고리 명"})
    @IsString() 
    name: string;

    @ApiProperty({description: "카테고리 분배 포인트"})
    @IsInt()
    downloadDistribution: number;

    @ApiProperty({description: "카테고리 설명"})
    @IsString() 
    description: string;
}

