import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '@app/user/user.entity';
import { PersistArticleDto } from '@app/article/dto/persist-article.dto';
import { ArticleEntity } from '@app/article/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ArticleResponseInterface } from '@app/article/types/article-response.interface';
import slugify from 'slugify';
import { generate } from 'short-uuid';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async create(
    currentUser: UserEntity,
    createArticleDto: PersistArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);

    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = this.getSlug(createArticleDto.title);
    article.author = currentUser;

    return await this.articleRepository.save(article);
  }

  async findBySlug(slug: string): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({
      where: {
        slug,
      },
    });
  }

  async deleteArticle(
    slug: string,
    currentUserId: number,
  ): Promise<DeleteResult> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    return await this.articleRepository.delete({ slug });
  }

  async updateArticle(
    slug: string,
    updateArticleDto: PersistArticleDto,
    currentUserId: number,
  ) {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    Object.assign(article, updateArticleDto);

    return await this.articleRepository.save(article);
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return { article };
  }

  private getSlug(title: string): string {
    const slug = slugify(title, {
      lower: true,
    });
    const shortUUID = generate();

    return slug + '-' + shortUUID;
  }
}
