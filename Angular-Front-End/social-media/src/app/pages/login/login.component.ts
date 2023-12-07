// Importando o decorador Component e o módulo necessário do Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, firstValueFrom } from 'rxjs';
// Importando o serviço AuthService
import { AuthService } from 'src/app/services/auth.service/auth.service';

// Definindo o componente LoginComponent
@Component({
  selector: 'app-login', // Seletor do componente
  templateUrl: './login.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./login.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe LoginComponent
export class LoginComponent {
  inputs = {
    username: '',
    password: '',
  };
  err: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  handleChange(event: any): void {
    this.inputs = { ...this.inputs, [event.target.name]: event.target.value };
  }

  handleLogin(event: any): void {
    event.preventDefault();
    this.authService.login(this.inputs)
      .pipe(
        catchError((error) => {
          let errorMessage: string;

          if (error?.status === 400) {
            errorMessage = 'Nome de usuário ou senha incorretos';
          } else if (error?.status === 500) {
            errorMessage = 'Erro interno do servidor';
          } else {
            errorMessage = 'Ocorreu um erro inesperado';
          }

        this.err = errorMessage;
        throw error; // Re-throw para propagar o erro para subscribers subsequentes
      })
    )
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
