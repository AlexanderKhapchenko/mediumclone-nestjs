import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { TagEntity } from '../tag/tag.entity';

export default class TagSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(TagEntity);

    await repository.insert([
      {
        name: 'react',
      },
      {
        name: 'angular',
      },
    ]);
  }
}
