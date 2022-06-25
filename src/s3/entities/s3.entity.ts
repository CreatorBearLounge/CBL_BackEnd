import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("upload_file")
export class UploadFile {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    originalName: string;

    @CreateDateColumn() 
    createdAt: Date;

    @UpdateDateColumn() 
    updatedAt: Date; 
}