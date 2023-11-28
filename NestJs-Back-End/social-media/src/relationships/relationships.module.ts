import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/user.entity'
import { Relationship } from './relationships.entity'
import { RelationshipsController } from './relationships.controller'
import { RelationshipsService } from './relationships.service'

@Module({
  imports: [TypeOrmModule.forFeature([Relationship, User])],
  exports: [TypeOrmModule],
  controllers: [RelationshipsController],
  providers: [RelationshipsService],
})
export class RelationshipsModule {}
