import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Download } from "../../Entity/download.entity";

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

    // 다운로드
    @OneToMany(type => Download, download => download.user, { eager: false })
    download: Download[];
  
    // refresh token 저장
//     @Column({
//       name: 'current_hashed_refresh_token',
//       nullable: true
//     })
//     currentHashedRefreshToken?: string;
//   출처: https://mobicon.tistory.com/593 [Mobile Convergence:티스토리]
}
