import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { User } from 'src/users/user.entity'
import { Relationship } from 'src/relationships/relationships.entity'
import { Comment } from 'src/comment/comment.entity'
import { Like } from 'src/likes/likes.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Relationship, Comment, Like]),
  ], // Certifique-se de incluir o PostRepository aqui
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
