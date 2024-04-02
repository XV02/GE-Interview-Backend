import {MigrationInterface, QueryRunner} from "typeorm";

export class EmployeeTable1712033468576 implements MigrationInterface {
    name = 'EmployeeTable1712033468576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "pronouns" character varying NOT NULL, "instagramHandle" character varying NOT NULL, "profilePicture" character varying NOT NULL, "xp" integer NOT NULL, CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE ("email"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
