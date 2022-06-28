import { FileSystemStoredFile } from "nestjs-form-data";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Art")
export class Art extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    category: string;

    @Column({ nullable: true })
    artist: string;

    @Column('date', { nullable: true })
    date: Date;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    viewCount: number;

    // @Column({type: 'bytea', nullable: true})
    // thumbnail: FileSystemStoredFile;
    @Column({ nullable: true })
    thumbnail: string;
}
