/* eslint-disable prettier/prettier */
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'

@Entity('relationships')
export class Relationship {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.followers, { eager: true })
  @JoinColumn({ name: 'followerUserId' })
  followerUser: User;

  @ManyToOne(() => User, user => user.followed, { eager: true })
  @JoinColumn({ name: 'followedUserId' })
  followedUser: User;
}
