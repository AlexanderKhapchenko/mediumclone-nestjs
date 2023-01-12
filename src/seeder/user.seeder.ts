import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { hash } from 'bcrypt';
import { UserEntity } from '../user/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(UserEntity);
    const password = await hash('123', 10);

    await repository.insert([
      {
        username: 'stepan_bandera',
        email: 'sr.ban@gmail.com',
        password,
      },
    ]);

    const userFactory = await factoryManager.get(UserEntity);
    await userFactory.saveMany(5);
  }
}
