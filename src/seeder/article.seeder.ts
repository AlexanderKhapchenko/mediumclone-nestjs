import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { ArticleEntity } from '../article/article.entity';

export default class ArticleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ArticleEntity);

    await repository.insert([
      {
        slug: 'first-article',
        title: 'first title',
        description: 'first description',
        body: 'first body',
        tagList: ['react'],
        author: () => {
          // First user id
          return '1';
        },
      },
      {
        slug: 'second-article',
        title: 'second title',
        description: 'second description',
        body: 'second body',
        tagList: ['react', 'angular'],
        author: () => {
          return '1';
        },
      },
    ]);
  }
}
