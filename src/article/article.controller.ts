import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from '@app/article/article.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import { PersistArticleDto } from '@app/article/dto/persist-article.dto';
import { ArticleResponseInterface } from '@app/article/types/article-response.interface';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: PersistArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.create(
      currentUser,
      createArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Get(':slug')
  async getSingleArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);

    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(@User('id') currentUserId, @Param('slug') slug: string) {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateArticle(
    @User('id') currentUserId,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: PersistArticleDto,
  ) {
    const article = await this.articleService.updateArticle(
      slug,
      updateArticleDto,
      currentUserId,
    );

    return this.articleService.buildArticleResponse(article);
  }
}
