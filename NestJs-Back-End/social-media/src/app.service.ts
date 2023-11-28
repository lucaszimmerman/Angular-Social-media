import { Injectable } from '@nestjs/common'

// Declara uma classe chamada AppService, que será um serviço no contexto do NestJS
@Injectable()
export class AppService {
  // Declara um método chamado getHello que retorna uma string
  getHello(): string {
    // Retorna a string 'Hello World!'
    return 'Is Working!'
  }
}
