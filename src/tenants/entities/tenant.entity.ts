import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "tenants" })
export class Tenant extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Unique(["name"])
    name: string;

    @Column()
    @Unique(["email"])
    email: string;

    @Column()
    password: string;
}
