import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './user.entity'

@Controller('api/user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:userId')
  async getUser(@Param('userId') id: number) {
    try {
      const user = await this.userService.getUser(id)
      return user
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: 'User not found' }
      }
      throw error
    }
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateData)
  }
}
