import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SeederOptions } from 'typeorm-extension';
import UserSeeder from './seeder/user.seeder';
import TagSeeder from './seeder/tag.seeder';
import ArticleSeeder from './seeder/article.seeder';
import UserFactory from './seeder/factory/user.factory';

const option: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'mediumclone',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  seeds: [UserSeeder, TagSeeder, ArticleSeeder],
  factories: [UserFactory],
};

const AppDataSource = new DataSource(option);

export default AppDataSource;
