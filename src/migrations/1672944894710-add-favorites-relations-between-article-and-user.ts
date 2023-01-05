import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFavoritesRelationsBetweenArticleAndUser1672944894710
  implements MigrationInterface
{
  name = 'addFavoritesRelationsBetweenArticleAndUser1672944894710';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_favorites_article" ("user_id" integer NOT NULL, "article_id" integer NOT NULL, CONSTRAINT "PK_b75ce2ec659c899063699ccd53c" PRIMARY KEY ("user_id", "article_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ab24b5af3df3b3d90c9f137cd5" ON "user_favorites_article" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6785d865ca00e3c8baaac56e18" ON "user_favorites_article" ("article_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorites_article" ADD CONSTRAINT "FK_ab24b5af3df3b3d90c9f137cd5c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorites_article" ADD CONSTRAINT "FK_6785d865ca00e3c8baaac56e188" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_favorites_article" DROP CONSTRAINT "FK_6785d865ca00e3c8baaac56e188"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorites_article" DROP CONSTRAINT "FK_ab24b5af3df3b3d90c9f137cd5c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6785d865ca00e3c8baaac56e18"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ab24b5af3df3b3d90c9f137cd5"`,
    );
    await queryRunner.query(`DROP TABLE "user_favorites_article"`);
  }
}
