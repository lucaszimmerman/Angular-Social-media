import { Injectable, NotFoundException } from '@nestjs/common'
import { In, Repository } from 'typeorm'
import { Post } from './post.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Relationship } from 'src/relationships/relationships.entity'
import { User } from 'src/users/user.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Relationship) // Adicione o repositório de Relationships
    private readonly relationshipRepository: Repository<Relationship>,
  ) {}

  async getPosts(userId: number): Promise<any[]> {
    // Consulta para obter os usuários seguidos pelo usuário atual
    const followedUsers = await this.relationshipRepository.find({
      where: { followerUser: { id: userId } },
      relations: ['followedUser'],
    })

    // Extrai os IDs dos usuários seguidos
    const followedUserIds = followedUsers.map(
      (relationship) => relationship.followedUser.id,
    )

    // Adicione o próprio usuário à lista se não estiver presente
    if (!followedUserIds.includes(userId)) {
      followedUserIds.push(userId)
    }

    // Consulta para obter os posts dos usuários seguidos
    const posts = await this.postRepository.find({
      where: { user: { id: In(followedUserIds) } },
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    })

    // Mapeia os posts e adiciona informações adicionais
    return posts.map((post) => ({
      ...post,
      userId: post.user.id,
      name: post.user.name,
      profilePic: post.user.profilePic,
      isCurrentUser: post.user.id === userId,
    }))
  }

  async getPost(id: number): Promise<any | undefined> {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: ['user'], // Se precisar de informações do usuário associado à postagem
    })

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`)
    }

    return {
      ...post,
      userId: post.user.id,
      name: post.user.name,
      profilePic: post.user.profilePic,
    }
  }

  async addPost(desc: string, img: string, userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (!user) {
      throw new Error('User not found')
    }

    const post = new Post()
    post.desc = desc
    post.img = img
    post.createdAt = new Date()
    post.user = user

    await this.postRepository.save(post)
  }

  async deletePost(id: number, userId: number): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id: id, user: { id: userId } },
    })

    if (!post) {
      throw new Error('Post not found')
    }

    await this.postRepository.remove(post)
  }
  catch(error) {
    if (error instanceof NotFoundException) {
      throw error
    }
    throw new Error('Failed to delete post')
  }
}
