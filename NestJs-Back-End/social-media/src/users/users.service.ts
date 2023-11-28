/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'username',
        'email',
        'name',
        'coverPic',
        'profilePic',
        'city',
        'website',
        // Adicione outras propriedades necessárias aqui
      ],
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
  catch(error) {
    throw error // Propaga outros erros para o controlador lidar
  }

  async updateUser(userId: number, updateData: Partial<User>): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } })

      if (!user) {
        throw new NotFoundException('User not found')
      }

      Object.assign(user, updateData)

      return await this.userRepository.save(user)
    } catch (error) {
      throw error // Propaga outros erros para o controlador lidar
    }
  }
}
