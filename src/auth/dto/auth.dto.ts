import { IsInt, IsString } from "class-validator";

export class AuthDto {
    @IsString()
    addressId: string;

    @IsInt()
    countNFT: number;

}
