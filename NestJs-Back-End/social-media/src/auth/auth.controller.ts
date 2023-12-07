import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Response } from 'express'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Res() res,
  ): Promise<any> {
    try {
      // Verificar se algum dos parâmetros é vazio ou contém apenas espaços em branco
      if (
        !username.trim() ||
        !email.trim() ||
        !password.trim() ||
        !name.trim()
      ) {
        throw new BadRequestException('Todos os campos são obrigatórios.')
      }

      const result = await this.authService.register(
        username,
        email,
        password,
        name,
      )

      res.status(201).json({
        message: 'Registration successful',
        user: {
          id: result.id,
          username: result.username,
          password: result.password,
          email: result.email,
          name: result.name,
        },
      })
    } catch (error) {
      if (error instanceof ConflictException) {
        res.status(409).json({ error: 'User already exists' })
      } else if (error instanceof BadRequestException) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res,
  ): Promise<any> {
    try {
      const result = await this.authService.login(username, password)
      // Configurar o cookie e enviar resposta JSON
      const responseObject = {
        id: result.id,
        username: result.username,
        email: result.email,
        name: result.name,
        coverPic: result.coverPic,
        profilePic: result.profilePic,
        city: result.city,
        website: result.website,
      }

      res
        .cookie('accessToken', result.token, {
          httpOnly: true,
        })
        .status(200)
        .json(responseObject)
    } catch (error) {
      // Tratar exceções aqui, por exemplo:
      if (error instanceof UnauthorizedException) {
        res.status(400).json('Wrong password or username')
      } else {
        // Outras exceções
        res.status(500).json('Internal server error')
      }
    }
  }

  @Post('logout')
  async logout(@Req() req, @Res() res: Response): Promise<any> {
    try {
      // Remover o cookie 'accessToken' ao fazer logout
      res.cookie('accessToken', '', {
        secure: true,
        sameSite: 'none',
      })

      return res.status(200).json('User has been logged out.')
    } catch (error) {
      // Lidar com erros de logout, se necessário
      console.error('Erro durante o logout:', error)
      return res.status(500).json('Internal Server Error')
    }
  }
}
