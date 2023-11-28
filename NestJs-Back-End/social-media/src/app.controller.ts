import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { AppService } from './app.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Endpoint para lidar com requisições GET na raiz da aplicação
  @Get()
  getHello(): string {
    // Chama o método 'getHello()' do serviço 'AppService'
    // O serviço retorna a mensagem 'Hello World!'
    return this.appService.getHello()
  }

  @Post('api/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return { filename: file.filename }
  }
}
