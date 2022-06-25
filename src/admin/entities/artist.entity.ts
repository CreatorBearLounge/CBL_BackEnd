import { FileSystemStoredFile } from "nestjs-form-data";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Artist")
export class Artist extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    resume: string;

    @Column({type: 'bytea', nullable: true})
    thumbnail: FileSystemStoredFile;
}
