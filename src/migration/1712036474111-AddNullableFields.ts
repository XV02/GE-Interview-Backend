import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNullableFields1712036474111 implements MigrationInterface {
    name = 'AddNullableFields1712036474111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "instagramHandle" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "profilePicture" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "profilePicture" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "instagramHandle" SET NOT NULL`);
    }

}
