import { ApiProperty } from "@nestjs/swagger";
import { FileSystemStoredFile } from "nestjs-form-data";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Art")
export class Art extends BaseEntity{
    @ApiProperty({description: "작품 아이디"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({description: "작품 제목"})
    @Column({ nullable: true })
    title: string;

    @ApiProperty({description: "작품 카테고리 아이디"})
    @Column({ nullable: true })
    categoryId: number;

    @ApiProperty({description: "작품의 작가"})
    @Column({ nullable: true })
    artistId: number;

    @ApiProperty({description: "작품 생성일"})
    @CreateDateColumn() 
    date: Date;

    @ApiProperty({description: "작품 소개"})
    @Column({ nullable: true })
    description: string;

    @ApiProperty({description: "작품 조회수"})
    @Column({ nullable: true })
    viewCount: number;

    @ApiProperty({description: "작품 다운로드 회수"})
    @Column({ nullable: true })
    downloadCount: number;
    
    @ApiProperty({description: "작품 다운로드 한 사용자 목록"})
    @Column("int", { nullable: true, array: true })
    downloadUserId: number[];

    @ApiProperty({description: "작품 썸네일"})
    @Column({ nullable: true })
    thumbnail: string;

    @ApiProperty({description: "작품 다운로드 url"})
    @Column({ nullable: true })
    downloadUrl: string;
}