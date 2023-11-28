import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import cookieParser from 'cookie-parser'

// Função assíncrona que inicializa a aplicação
async function bootstrap() {
  // Cria uma instância da aplicação usando NestFactory e o módulo principal (AppModule)
  const app = await NestFactory.create(AppModule)

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }

  app.use(cookieParser())

  app.enableCors(corsOptions)
  // Inicia a aplicação na porta 3000
  await app.listen(3000)

  // Exibe uma mensagem no console indicando que a API está funcionando
  console.log('API working!')
}

// Chama a função bootstrap para iniciar a aplicação
bootstrap()
