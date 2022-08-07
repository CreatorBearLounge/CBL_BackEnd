import { ApiProperty } from "@nestjs/swagger";
import { FileSystemStoredFile } from "nestjs-form-data";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Artist")
export class Artist extends BaseEntity{
    @ApiProperty({description: "작가 id"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({description: "작가 이름"})
    @Column({ nullable: true })
    name: string;

    @ApiProperty({description: "작가 소개"})
    @Column({ nullable: true })
    description: string;

    @ApiProperty({description: "작가 이력"})
    @Column({ nullable: true })
    resume: string;

    // @Column({type: 'bytea', nullable: true})
    // thumbnail: FileSystemStoredFile;

    @ApiProperty({description: "작가 프로필 사진"})
    @Column({ nullable: true })
    profile: string;
}
