import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from 'src/post/post.entity'
import { Relationship } from 'src/relationships/relationships.entity'
import { User } from 'src/users/user.entity'
import { LikesController } from './likes.controller'
import { LikesService } from './likes.service'
import { Like } from './likes.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Relationship, Like])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
