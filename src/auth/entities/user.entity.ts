import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('User')
@Unique(['addressId'])
export class User {
    @ApiProperty({description: "사용자 아이디"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({description: "사용자 어드레스"})
    @Column()
    addressId: string;

    @ApiProperty({description: "사용자 nft 개수"})
    @Column()
    countNFT: number;

    @ApiProperty({description: "사용자 생성일"})
    @CreateDateColumn({ name: 'created_at', select: false })
    createdAt: Date;
  
    // refresh token 저장
//     @Column({
//       name: 'current_hashed_refresh_token',
//       nullable: true
//     })
//     currentHashedRefreshToken?: string;
//   출처: https://mobicon.tistory.com/593 [Mobile Convergence:티스토리]
}