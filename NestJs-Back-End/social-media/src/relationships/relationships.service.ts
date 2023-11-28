import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/user.entity'
import { Repository } from 'typeorm'
import { Relationship } from './relationships.entity'

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectRepository(Relationship)
    private readonly relationshipsRepository: Repository<Relationship>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getRelationships(followedUserId: number): Promise<number[]> {
    try {
      const relationships = await this.relationshipsRepository.find({
        where: { followedUser: { id: followedUserId } },
        select: ['followerUser'],
      })

      if (!relationships || relationships.length === 0) {
        throw new NotFoundException('Relationships not found')
      }

      return relationships.map((relationship) => relationship.followerUser.id)
    } catch (error) {
      throw new NotFoundException('Relationships not found')
    }
  }

  async addRelationship(
    followerUserId: number,
    followedUserId: number,
  ): Promise<void> {
    const followedUser = await this.userRepository.findOne({
      where: { id: followedUserId },
    })

    if (!followedUser) {
      throw new Error('followed not found')
    }

    const followerUser = await this.userRepository.findOne({
      where: { id: followerUserId },
    })

    if (!followerUser) {
      throw new Error('follower not found')
    }

    const relationship = new Relationship()
    relationship.followedUser = followedUser
    relationship.followerUser = followerUser

    await this.relationshipsRepository.save(relationship)
  }

  async deleteRelationship(
    followerUserId: number,
    followedUserId: number,
  ): Promise<void> {
    try {
      if (!followerUserId || !followedUserId) {
        throw new BadRequestException('Invalid user IDs')
      }

      const relationship = await this.relationshipsRepository.findOne({
        where: {
          followerUser: { id: followerUserId },
          followedUser: { id: followedUserId },
        },
      })

      if (!relationship) {
        throw new NotFoundException('Relationship not found')
      }

      await this.relationshipsRepository.remove(relationship)
    } catch (error) {
      // Em vez de verificar se é uma NotFoundException, verificar se é uma instância de Error
      if (error instanceof Error) {
        throw error
      }
      // Lide com outros tipos de erro, se necessário
      throw new InternalServerErrorException('Failed to delete relationship')
    }
  }
}
