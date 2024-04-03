import { Employee } from "src/employee/entities/employee.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    @Column()
    lastInteraction: Date;

    @OneToMany(() => Employee, employee => employee.id)
    employees: Employee[];
}
