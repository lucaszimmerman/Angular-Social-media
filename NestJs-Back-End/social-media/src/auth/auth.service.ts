import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(
    username: string,
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    // Verificar se o usuário já existe
    const userExists = await this.userRepository.findOne({
      where: { username },
    })

    if (userExists) {
      throw new ConflictException('User already exists')
    }
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Lógica de registro aqui (pode incluir hashing de senha)
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      name,
    })
    await this.userRepository.save(newUser)

    return newUser
  }

  async login(username: string, password: string): Promise<any> {
    // Verificar se o usuário já existe
    const user = await this.userRepository.findOne({
      where: { username },
    })

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    // Comparar senhas
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      throw new UnauthorizedException('Wrong password or username')
    }
    // Criar token JWT
    const token = sign({ id: user.id }, 'secret')

    // Retornar dados do usuário sem a senha
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: Userpassword, ...userWithoutPassword } = user

    return { token, ...userWithoutPassword }
  }

  async logout(): Promise<any> {
    return 'Logout'
  }
}
