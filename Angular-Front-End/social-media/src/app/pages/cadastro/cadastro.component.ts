import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service/auth.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  inputs = {
    username: '',
    email: '',
    password: '',
    name: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.inputs.username, this.inputs.email, this.inputs.password, this.inputs.name)
    .subscribe(
      (response: HttpResponse<any>) => {
        console.log('Status da requisição:', response.status);
        console.log('Corpo da resposta:', response.body);
        if (response.status === 201) {
          console.log('Registro bem-sucedido. Redirecionando para a página de login.');
          // Redirecionar para a página de login em caso de sucesso
          this.router.navigate(['/login']);
        } else {
          this.handleError('Erro no registro. Status inesperado: ' + response.status);
        }
      },
      (error) => {
        console.error('Erro na requisição:', error);

        if (error.status === 409) {
          this.handleError('Usuário já existe. Escolha outro nome de usuário.');
        } else if (error.status === 400) {
          this.handleError('Todos os campos são obrigatórios');
        } else {
          this.handleError('Erro inesperado. Por favor, tente novamente mais tarde.');
        }
      }
    );
}

private handleError(message: string): void {
  this.errorMessage = message;
  // Limpar a mensagem de erro após alguns segundos (opcional)
  setTimeout(() => {
    this.errorMessage = '';
  }, 5000); // Limpar após 5 segundos
}
}
