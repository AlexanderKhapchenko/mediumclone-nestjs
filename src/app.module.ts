import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserModule } from '@app/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { ArticleModule } from '@app/article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    }),
    ConfigModule.forRoot({ cache: true }),
    TagModule,
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
