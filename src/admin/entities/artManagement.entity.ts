import { FileSystemStoredFile } from "nestjs-form-data";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    
    @Column("int", { nullable: true, array: true })
    downloadUserId: number[];

    // @Column({type: 'bytea', nullable: true})
    // thumbnail: FileSystemStoredFile;
    @Column({ nullable: true })
    thumbnail: string;

    @Column({ nullable: true })
    downloadUrl: string;
}