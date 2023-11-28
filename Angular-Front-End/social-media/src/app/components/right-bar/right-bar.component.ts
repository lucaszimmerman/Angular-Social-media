// Importando o módulo necessário do Angular e o serviço AuthService
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';

// Definindo o componente RightBarComponent
@Component({
  selector: 'app-right-bar', // Seletor do componente
  templateUrl: './right-bar.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./right-bar.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe RightBarComponent
export class RightBarComponent {

  currentUser: any; // Variável para armazenar informações do usuário atual

  // Injetando o serviço AuthService no construtor
  constructor(private authService: AuthService) {
    // Assinando as alterações do usuário atual para a variável currentUser
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user; // Atualizando a variável currentUser com o usuário atual
    });
  }

  // Método ngOnInit para atualizar o usuário atual com base em alterações
  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user; // Atualizando a variável currentUser com o usuário atual
    });
  }
}
