// Importando o módulo necessário do Angular e os ícones do Font Awesome
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleQuestion, faGear, faHouse, faSignOutAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faGrip } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
// Importando os serviços AuthService e DarkModeService
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';
import { UserService } from 'src/app/services/user.service/user.service';

// Definindo o componente NavBarComponent
@Component({
  selector: 'app-nav-bar', // Seletor do componente
  templateUrl: './nav-bar.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./nav-bar.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe NavBarComponent
export class NavBarComponent {
  // Definindo os ícones do Font Awesome para a barra de navegação
  homeIcon = faHouse;
  darkModeIcon = faMoon;
  faGrip = faGrip;
  notificationIcon = faBell;
  messagesIcon = faEnvelope;
  userIcon = faUser;
  searchIcon = faMagnifyingGlass;
  lightModeIcon = faSun;
  helpIcon = faCircleQuestion;
  configIcon = faGear;
  trashIcon = faTrash;
  exitIcon = faSignOutAlt;

  currentUser: any;
  error: any
  settingsOpen:boolean = false;

  constructor(private authService: AuthService, private darkModeService: DarkModeService, private userService: UserService, private router: Router) {
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

  handleLogout(event: any): void {
    event.preventDefault();
    this.authService.logout().subscribe(
      () => {
        // Redirecione para a página de login ou outra página após o logout
        this.router.navigate(['/login']);
      },
      (error) => {
        // Lidar com erros de logout, se necessário
        console.error('Erro durante o logout:', error);
      }
    );
  }

  // Método ngOnInit para atualizar o usuário atual com base em alterações
  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user; // Atualizando a variável currentUser com o usuário atual
    });
  }

  toggleSettingsOpen() {
    this.settingsOpen = !this.settingsOpen; // Alterna o valor da variável commentOpen entre verdadeiro e falso
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
