// Importando o módulo necessário do Angular e o serviço AuthService
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';
import { UserService } from 'src/app/services/user.service/user.service';

// Definindo o componente LeftBarComponent
@Component({
  selector: 'app-left-bar', // Seletor do componente
  templateUrl: './left-bar.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./left-bar.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe LeftBarComponent
export class LeftBarComponent {

  currentUser: any;
  error: any;

  constructor(private authService: AuthService, private darkModeService: DarkModeService, private userService: UserService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.getUser(this.currentUser.id)
    });
  }

  getUser(userId:number): void {
    // Chame o serviço para obter comentários, passando o ID do post associado
    this.userService.getUser(userId).subscribe(
      (data: any) => {
        this.currentUser = data;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  // Método ngOnInit para atualizar o usuário atual com base em alterações
  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user; // Atualizando a variável currentUser com o usuário atual
    });
  }
}
