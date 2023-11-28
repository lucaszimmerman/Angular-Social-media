import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like } from './likes.entity'
import { Repository } from 'typeorm'
import { Post } from 'src/post/post.entity'
import { User } from 'src/users/user.entity'

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getLikes(postId: number): Promise<number[]> {
    try {
      const likes = await this.likeRepository.find({
        where: { post: { id: postId } },
        relations: ['user', 'post'],
      })
      // Mapeia a lista de likes para obter apenas os userIds
      const userIds = likes.map((like) => like.user.id)

      return userIds
    } catch (error) {
      throw new NotFoundException('Likes not found')
    }
  }

  async addLike(userId: number, postId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (!user) {
      throw new Error('User not found')
    }

    const post = await this.postRepository.findOne({ where: { id: postId } })

    if (!post) {
      throw new Error('post not found')
    }

    const like = new Like()
    like.user = user
    like.post = post

    await this.likeRepository.save(like)
  }
  async deleteLike(userId: number, postId: number): Promise<void> {
    try {
      // Busca o like com base no userId e postId
      const like = await this.likeRepository.findOne({
        where: { user: { id: userId }, post: { id: postId } },
      })

      if (!like) {
        throw new NotFoundException('Like not found')
      }

      // Exclui o like
      await this.likeRepository.remove(like)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new Error('Failed to delete like')
    }
  }
}
