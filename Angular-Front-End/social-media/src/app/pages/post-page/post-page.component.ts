import { Component, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';
import { PostService } from 'src/app/services/post.service/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent {

  currentUser: any;
  postId: any;
  post: any;
  error: any;
  userId: any;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private darkModeService: DarkModeService, private route: ActivatedRoute,private postService: PostService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.userId = this.currentUser?.id;
    });
  }

  ngOnInit(): void {
    // Obtendo o parâmetro de rota 'userId'
    this.route.params.subscribe(params => {
      this.postId = +params['id']; // Converte para número
      // Agora, this.userId contém o valor do parâmetro 'userId'
      this.getPosts(this.postId);
    });

  }



  getPosts(postId: number): void {
    this.isLoading = true;
    this.postService.getPosts(this.userId).subscribe(
      (data: any) => {
        const posts = data.posts;

        // Encontrar o post pelo postId
        this.post = posts.find((post: any) => post.id === postId);

        if (this.post) {
          console.log(this.post);
        } else {
          console.log(`Post with ID ${postId} not found in the received data.`);
        }

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


}
