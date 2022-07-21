import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Category")
export class Category extends BaseEntity{
    @ApiProperty({description: "카테고리 썸네일"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({description: "카테고리 이름"})
    @Column({ nullable: true })
    name: string;

    @ApiProperty({description: "카테고리 다운로드 분배 포인트"})
    @Column({ nullable: true })
    downloadDistribution: number;

    @ApiProperty({description: "카테고리 소개"})
    @Column({ nullable: true })
    description: string;
}
