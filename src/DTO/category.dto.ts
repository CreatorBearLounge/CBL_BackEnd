import { IsInt, IsString } from "class-validator";

export class CategoryDto {

    @IsString() 
    name: string;

    @IsInt()
    downloadDistribution: number;

    @IsString() 
    description: string;
}

