import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Relationship } from 'src/relationships/relationships.entity'
import { User } from 'src/users/user.entity'
import { Post } from 'src/post/post.entity'
import { CommentController } from './comment.controller'
import { Comment } from './comment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Relationship, Comment])], // Certifique-se de incluir o PostRepository aqui
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
