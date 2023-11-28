import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import { RelationshipsService } from './relationships.service'

@Controller('api/relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  @Get('/:followedUserId')
  async getRelationships(@Param('followedUserId') followedUserId: number) {
    try {
      const relationships =
        await this.relationshipsService.getRelationships(followedUserId)
      return relationships
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: 'Relationships not found' }
      }
      throw error
    }
  }

  @Post()
  async addRelationship(
    @Body('followerUserId') followerUserId: number,
    @Body('followedUserId') followedUserId: number,
  ) {
    try {
      await this.relationshipsService.addRelationship(
        followerUserId,
        followedUserId,
      )
      return { message: 'follow!.' }
    } catch (error) {
      return { error: 'Failed to follow.' }
    }
  }

  @Delete('/:followerUserId/:followedUserId')
  async deleteRelationship(
    @Param('followerUserId') followerUserId: number,
    @Param('followedUserId') followedUserId: number,
  ) {
    try {
      await this.relationshipsService.deleteRelationship(
        followerUserId,
        followedUserId,
      )
      console.log('Chegou aqui:', followerUserId, followerUserId)
      return { message: 'Unfollowed successfully.' }
    } catch (error) {
      console.error('Erro durante o unfollow:', error)

      // Verifique se a exceção é do tipo NotFoundException antes de retornar a mensagem de erro
      if (error instanceof NotFoundException) {
        return { error: 'Relationship not found.' }
      }

      // Se não for uma NotFoundException, retorne uma mensagem de erro genérica
      return { error: 'Failed to Unfollow. An unexpected error occurred.' }
    }
  }
}
