import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('User')
@Unique(['addressId'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    addressId: string;

    @Column()
    countNFT: number;

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
