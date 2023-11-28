// Importando o decorador Component do Angular core
import { Component } from '@angular/core';
// Importando o serviço AuthService
import { AuthService } from './services/auth.service/auth.service';

// Definindo o componente AppRoot
@Component({
  selector: 'app-root', // Seletor do componente
  templateUrl: './app.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./app.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe do componente
export class AppComponent {
  title = 'social-media'; // Título do aplicativo

  currentUser: any; // Variável para armazenar informações do usuário atual

  // Injetando o serviço AuthService no construtor
  constructor(private authService: AuthService) {
    // Assinando as alterações do usuário atual para a variável currentUser
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user; // Atualizando a variável currentUser com o usuário atual
    });
  }
}
