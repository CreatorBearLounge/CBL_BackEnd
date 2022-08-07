import { Download } from "src/Entity/download.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Art")
export class Art extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    categoryId: number;

    @Column({ nullable: true })
    artistId: number;

    @CreateDateColumn() 
    date: Date;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    viewCount: number;

    @Column({ nullable: true })
    downloadCount: number;

    @Column({ nullable: true })
    thumbnail: string;

    @Column({ nullable: true })
    downloadUrl: string;

    // 다운로드
    @OneToMany(type =>Download, download => download.art, {eager: false})
    download: Download[];
}