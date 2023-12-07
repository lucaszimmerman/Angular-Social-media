// Importando o módulo necessário do Angular e o serviço AuthService
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { RelationshipService } from 'src/app/services/relationship.service/relationship.service';

// Definindo o componente RightBarComponent
@Component({
  selector: 'app-right-bar', // Seletor do componente
  templateUrl: './right-bar.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./right-bar.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe RightBarComponent
export class RightBarComponent {

  currentUser: any; // Variável para armazenar informações do usuário atual
  suggestedUsers: any[] = [];
  showAllUsers: boolean = false;
  showPopup = false;
  allSuggestedUsers: any[] = [];

  // Injetando o serviço AuthService no construtor
  constructor(private authService: AuthService,  private relationshipService: RelationshipService) {
    // Assinando as alterações do usuário atual para a variável currentUser
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user; // Atualizando a variável currentUser com o usuário atual
      this.loadSuggestedUsers();
    });
  }

  // Método ngOnInit para atualizar o usuário atual com base em alterações
  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user; // Atualizando a variável currentUser com o usuário atual
    });
  }

  loadSuggestedUsers() {
    // Carregue os usuários sugeridos chamando o serviço adequado
    this.relationshipService.getSuggestedUsers(this.currentUser.id).subscribe(
      (suggestedUsers: any[]) => {
        this.suggestedUsers = suggestedUsers;
      },
      (error) => {
        console.error('Erro ao carregar usuários sugeridos:', error);
      }
    );
  }

  followUser(userId: number) {
    // Lógica para seguir o usuário (chame o serviço apropriado)
    this.relationshipService.addRelationship(this.currentUser.id, userId).subscribe(
      (response) => {
        // Atualize a lista de usuários sugeridos após seguir um usuário
        this.loadSuggestedUsers();
      },
      (error) => {
        console.error('Erro ao seguir usuário:', error);
      }
    );
  }

  // Método para exibir todos os usuários sugeridos no pop-up
  showMore() {
    this.allSuggestedUsers = this.suggestedUsers.slice(3);
    this.showPopup = true;
  }
}
