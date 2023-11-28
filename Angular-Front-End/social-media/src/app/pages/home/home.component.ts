// Importando os módulos e componentes necessários do Angular
import { Component } from '@angular/core';
// Importando os serviços AuthService e DarkModeService
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';

// Definindo o componente HomeComponent
@Component({
  selector: 'app-home', // Seletor do componente
  templateUrl: './home.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./home.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe HomeComponent
export class HomeComponent {

  currentUser: any;

  constructor(private authService: AuthService, private darkModeService: DarkModeService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }



  // Método para obter o estado do modo escuro
  get darkMode(): boolean {
    return this.darkModeService.darkMode.value; // Obtendo o valor atual do modo escuro do serviço DarkModeService
  }

  // Método para alternar o modo escuro
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode(); // Chamando o método para alternar o modo escuro do serviço DarkModeService
  }

}
