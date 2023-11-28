import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import { LikesService } from './likes.service'

@Controller('api/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get('/:postId')
  async getLikes(@Param('postId') postId: number) {
    try {
      const likes = await this.likesService.getLikes(postId)
      return { likes }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: 'Likes not found' }
      }
      throw error
    }
  }

  @Post()
  async addLike(
    @Body('userId') userId: number,
    @Body('postId') postId: number,
  ) {
    try {
      await this.likesService.addLike(userId, postId)
      return { message: 'like!.' }
    } catch (error) {
      return { error: 'Failed to like.' }
    }
  }

  @Delete('/:userId/:postId')
  async deleteLike(
    @Param('userId') userId: number,
    @Param('postId') postId: number,
  ) {
    try {
      await this.likesService.deleteLike(userId, postId)
      return { message: 'Like deleted!' }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: 'Like not found' }
      }
      throw error
    }
  }
}
