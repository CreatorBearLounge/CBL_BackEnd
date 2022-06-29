import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Category")
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    downloadDistribution: number;

    @Column({ nullable: true })
    description: string;
}
