import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './comment.entity'
import { Post } from 'src/post/post.entity'
import { User } from 'src/users/user.entity'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getComments(postId: number): Promise<Comment[]> {
    try {
      const comments = await this.commentRepository.find({
        where: { post: { id: postId } },
        relations: ['user', 'post'],
        order: { createdAt: 'DESC' },
      })
      return comments
    } catch (error) {
      throw new NotFoundException('Comments not found')
    }
  }

  async addComment(
    desc: string,
    userId: number,
    postId: number,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (!user) {
      throw new Error('User not found')
    }

    const post = await this.postRepository.findOne({ where: { id: postId } })

    if (!post) {
      throw new Error('post not found')
    }

    const comment = new Comment()
    comment.desc = desc
    comment.createdAt = new Date()
    comment.user = user
    comment.post = post

    await this.commentRepository.save(comment)
  }

  async deleteComment(id: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: id, user: { id: userId } },
    })

    if (!comment) {
      throw new Error('Comment not found')
    }

    await this.commentRepository.remove(comment)
  }
  catch(error) {
    if (error instanceof NotFoundException) {
      throw error
    }
    throw new Error('Failed to delete comment')
  }
}
