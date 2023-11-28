/* eslint-disable prettier/prettier */
import { Post } from 'src/post/post.entity';
import { Relationship } from 'src/relationships/relationships.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { Comment } from 'src/comment/comment.entity';
import { Like } from 'src/likes/likes.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true }) // Adicione esta linha
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  coverPic: string;

  @Column({ nullable: true })
  profilePic: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  website: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Relationship, (relationship) => relationship.followerUser)
  followers: Relationship[];

  @OneToMany(() => Relationship, (relationship) => relationship.followedUser)
  followed: Relationship[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[]

  @OneToMany(() => Like, like => like.user)
  likes: Like[]

}
