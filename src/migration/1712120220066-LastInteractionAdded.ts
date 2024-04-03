import {MigrationInterface, QueryRunner} from "typeorm";

export class LastInteractionAdded1712120220066 implements MigrationInterface {
    name = 'LastInteractionAdded1712120220066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenants" ADD "lastInteraction" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "lastInteraction"`);
    }

}
