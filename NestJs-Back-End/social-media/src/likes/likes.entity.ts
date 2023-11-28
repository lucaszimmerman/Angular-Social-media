/* eslint-disable prettier/prettier */
import { Post } from 'src/post/post.entity';
import { User } from 'src/users/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number 

  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Post, post => post.likes)
  @JoinColumn({ name: 'postId' })
  post: Post;
}
