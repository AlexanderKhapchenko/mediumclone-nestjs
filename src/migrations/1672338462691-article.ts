import { MigrationInterface, QueryRunner } from 'typeorm';

export class article1672338462691 implements MigrationInterface {
  name = 'article1672338462691';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "article" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "body" character varying NOT NULL DEFAULT '', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "tag_list" text NOT NULL, "favorites_count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "article"`);
  }
}
