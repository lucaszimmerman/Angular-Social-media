// Importando os módulos e componentes necessários do Angular e do Font Awesome
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEarthAmerica } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
// Importando os serviços AuthService e DarkModeService
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';
import { PostService } from 'src/app/services/post.service/post.service';
import { RelationshipService } from 'src/app/services/relationship.service/relationship.service';
import { UserService } from 'src/app/services/user.service/user.service';

// Definindo o componente PerfilComponent
@Component({
  selector: 'app-perfil', // Seletor do componente
  templateUrl: './perfil.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./perfil.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe PerfilComponent
export class PerfilComponent {
  // Definindo os ícones do Font Awesome para o perfil
  fbIcon = faFacebook;
  igIcon = faInstagram;
  ldIcon = faLinkedin;
  prIcon = faPinterest;
  ttIcon = faTwitter;
  locationIcon = faEarthAmerica;
  siteIcon = faGlobe;
  messageIcon = faEnvelope;
  moreIcon = faEllipsis;

  // Injetando o serviço DarkModeService no construtor
  posts: any[] = [];
  currentUser: any;
  userId!: number;
  user: any;
  error: any;
  userFollowers: number[] = [];
  isLoading: boolean = false;
  isFollowing:boolean = false;
  openUpdate = false;

  constructor(private authService: AuthService, private darkModeService: DarkModeService, private route: ActivatedRoute, private userService: UserService, private relationshipService: RelationshipService, private postService: PostService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    // Obtendo o parâmetro de rota 'userId'
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Converte para número
      // Agora, this.userId contém o valor do parâmetro 'userId'
      this.getUser(this.userId);
      this.getRelationships(this.userId);
      this.getPosts();
    });

  }

  getUser(userId:number): void {
    // Chame o serviço para obter comentários, passando o ID do post associado
    this.userService.getUser(userId).subscribe(
      (data: any) => {
        this.user = data;
        this.getRelationships(userId)
      },
      (error) => {
        this.error = error;
      }
    );
  }

  getRelationships(userId:number): void {
    // Chame o serviço para obter comentários, passando o ID do post associado
    this.relationshipService.getRelationships(userId).subscribe(
      (data: any) => {
        this.userFollowers = data;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  isFollowingCurrentUser(): boolean {
    return Array.isArray(this.userFollowers) && this.userFollowers.includes(this.currentUser.id);
  }




  async handleFollow(e: Event): Promise<void> {
    e.preventDefault();

    try {
      const isFollowing = this.isFollowingCurrentUser();

      if (isFollowing) {
        // Se já segue, parar de seguir
        await this.relationshipService.deleteRelationship(this.currentUser.id, this.userId).subscribe(() => {
          // Atualize as condições e a interface do usuário após a operação bem-sucedida
          this.getRelationships(this.userId);
        });
      } else {
        // Se não segue, seguir
        await this.relationshipService.addRelationship(this.currentUser.id, this.userId).subscribe(() => {
          // Atualize as condições e a interface do usuário após a operação bem-sucedida
          this.getRelationships(this.userId);
        });
      }
    } catch (err) {
      console.error('Error during follow/unfollow:', err);
    } finally {
      this.isLoading = false;
    }
  }



  getPosts(): void {
    this.isLoading = true;
    this.postService.getPosts(this.userId).subscribe(
      (data: any) => {
        this.posts = data.posts.filter((post: { userId: number }) => post.userId === this.userId);
        this.isLoading = false;
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }


  // Método para obter o estado do modo escuro
  get darkMode(): boolean {
    return this.darkModeService.darkMode.value; // Obtendo o valor atual do modo escuro do serviço DarkModeService
  }

  // Método para alternar o modo escuro
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode(); // Chamando o método para alternar o modo escuro do serviço DarkModeService
  }

  openUpdateComponent(): void {
    this.openUpdate = true;
  }


}
