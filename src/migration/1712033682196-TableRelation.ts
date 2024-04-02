import {MigrationInterface, QueryRunner} from "typeorm";

export class TableRelation1712033682196 implements MigrationInterface {
    name = 'TableRelation1712033682196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "tenantId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_ea6a339e5a0792172d53d405b00" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_ea6a339e5a0792172d53d405b00"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "tenantId"`);
    }

}
