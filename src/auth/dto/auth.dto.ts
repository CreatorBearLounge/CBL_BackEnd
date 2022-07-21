import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({description: "사용자 어드레스"})
    @IsString()
    addressId: string;

    @ApiProperty({description: "사용자가 소유한 nft 수"})
    @IsInt()
    countNFT: number;

}
