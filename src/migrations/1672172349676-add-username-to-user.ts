import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUsernameToUser1672172349676 implements MigrationInterface {
  name = 'addUsernameToUser1672172349676';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
  }
}
