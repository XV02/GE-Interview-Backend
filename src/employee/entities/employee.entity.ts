import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "employees" })
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    @Unique(["email"])
    email: string;

    @Column()
    pronouns: string;

    @Column()
    instagramHandle: string;

    @Column()
    profilePicture: string;

    @Column()
    xp: number;
}
