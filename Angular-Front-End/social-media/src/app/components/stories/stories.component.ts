// Importando os módulos necessários do Angular e os serviços AuthService e StoryService
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { StoryService } from 'src/app/services/story-service/story.service';
import { UserService } from 'src/app/services/user.service/user.service';

// Definindo o componente StoriesComponent
@Component({
  selector: 'app-stories', // Seletor do componente
  templateUrl: './stories.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./stories.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe StoriesComponent e implementando a interface OnInit
export class StoriesComponent implements OnInit {
  stories: any[] = []; // Array para armazenar as histórias
  currentUser: any; // Variável para armazenar informações do usuário atual
  error: any;

  // Injetando os serviços StoryService e AuthService no construtor
  constructor(private storyService: StoryService, private authService: AuthService, private userService: UserService) {
    // Assinando as alterações do usuário atual para a variável currentUser
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user; // Atualizando a variável currentUser com o usuário atual
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

  // Método ngOnInit para inicializar as histórias e o usuário atual
  ngOnInit(): void {
    this.stories = this.storyService.getStories(); // Obtendo as histórias do serviço StoryService
    // Assinando as alterações do usuário atual para a variável currentUser
  }
}
