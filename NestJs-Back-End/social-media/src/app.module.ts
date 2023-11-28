import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersController } from './users/users.controller'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/user.entity'
import { UsersModule } from './users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { PostController } from './post/post.controller'
import { PostService } from './post/post.service'
import { PostModule } from './post/post.module'
import { Post } from './post/post.entity'
import { Relationship } from './relationships/relationships.entity'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { CommentController } from './comment/comment.controller'
import { CommentModule } from './comment/comment.module'
import { Comment } from './comment/comment.entity'
import { CommentService } from './comment/comment.service'
import { LikesModule } from './likes/likes.module'
import { Like } from './likes/likes.entity'
import { UsersService } from './users/users.service'
import { RelationshipsController } from './relationships/relationships.controller'
import { RelationshipsModule } from './relationships/relationships.module'
import { RelationshipsService } from './relationships/relationships.service'

@Module({
  controllers: [
    AppController,
    UsersController,
    AuthController,
    PostController,
    CommentController,
    RelationshipsController,
  ],
  providers: [
    AppService,
    AuthService,
    PostService,
    CommentService,
    UsersService,
    RelationshipsService,
  ],
  imports: [
    AuthModule,
    PostModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3308,
      username: 'lucas',
      password: 'lucas123@',
      database: 'ecotech',
      entities: [User, Post, Relationship, Comment, Like],
      synchronize: false,
    }),
    UsersModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, '../../Angular-Front-End/social-media/src/assets/upload') // Ajuste o caminho conforme necessário
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname)
        },
      }),
    }),
    CommentModule,
    LikesModule,
    UsersModule,
    RelationshipsModule,
  ],
})
export class AppModule {}
