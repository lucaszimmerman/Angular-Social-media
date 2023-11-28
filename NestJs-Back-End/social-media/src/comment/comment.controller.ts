import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import { CommentService } from './comment.service'

@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:postId')
  async getComments(@Param('postId') postId: number) {
    try {
      const comments = await this.commentService.getComments(postId)
      return { comments }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: 'Comments not found' }
      }
      throw error
    }
  }

  @Post()
  async addComment(
    @Body('desc') desc: string,
    @Body('userId') userId: number,
    @Body('postId') postId: number,
  ) {
    try {
      await this.commentService.addComment(desc, userId, postId)
      return { message: 'Comment has been created.' }
    } catch (error) {
      return { error: 'Failed to create comment.' }
    }
  }
  @Delete('/:id')
  async deleteComment(@Param('id') id: number, @Body('userId') userId: number) {
    try {
      await this.commentService.deleteComment(id, userId)
      return { message: 'comment deleted!' }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: 'Comment not found' }
      }
      throw error
    }
  }
}
