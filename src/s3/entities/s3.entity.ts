import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("upload_file")
export class S3Entity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    originalName: string;

    @Column()
    encoding: string;

    @Column()
    mimeType: string;

    // @Column()
    // buffer: Buffer;
    
    @Column("decimal", { precision: 10, scale: 2 })
    size: number;

    @Column({ comment: "s3 업로드된 location url" })
    url: string;

    @CreateDateColumn() 
    createdAt: Date;

    @UpdateDateColumn() 
    updatedAt: Date; 
}