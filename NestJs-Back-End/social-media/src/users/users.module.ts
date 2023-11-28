import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller'
import { User } from './user.entity'
import { PostService } from 'src/post/post.service'
import { Post } from 'src/post/post.entity'
import { Relationship } from 'src/relationships/relationships.entity'
import { Comment } from 'src/comment/comment.entity'
import { CommentService } from 'src/comment/comment.service'
import { Like } from 'src/likes/likes.entity'
import { UsersService } from './users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Relationship, Comment, Like]),
  ],
  exports: [TypeOrmModule],
  providers: [PostService, CommentService, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
