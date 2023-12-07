import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { PostService } from './post.service'

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:userId')
  async getPosts(@Param('userId') userId: number) {
    try {
      const posts = await this.postService.getPosts(userId)
      return { posts }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        // Usuário não autorizado
        return { error: 'Not logged in!', status: 401 }
      } else if (error instanceof ForbiddenException) {
        // Token inválido
        return { error: 'Token is not valid!', status: 403 }
      } else {
        // Outros erros
        return { error: 'Erro ao obter os posts.', status: 500 }
      }
    }
  }
  @Get('/single/:id')
  async getPost(@Param('id') id: number) {
    try {
      const post = await this.postService.getPost(id)
      return { post }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: 'Post not found', status: 404 }
      }
      throw error
    }
  }
  @Post()
  async addPost(
    @Body('desc') desc: string,
    @Body('img') img: string,
    @Body('userId') userId: number,
  ) {
    try {
      await this.postService.addPost(desc, img, userId)
      return { message: 'Post has been created.' }
    } catch (error) {
      return { error: 'Failed to create post.' }
    }
  }
  @Delete('/:id')
  async deletePost(@Param('id') id: number, @Body('userId') userId: number) {
    try {
      await this.postService.deletePost(id, userId)
      return { message: 'post deleted!' }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: 'Post not found' }
      }
      throw error
    }
  }
}
