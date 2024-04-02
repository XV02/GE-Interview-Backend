import { Tenant } from "src/tenants/entities/tenant.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    @Column()
    tenantId: string;

    @ManyToOne(() => Tenant, tenant => tenant.id, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "tenantId" })
    tenant: Tenant;
}
