// Importando o módulo necessário do Angular
import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { PostService } from 'src/app/services/post.service/post.service';


// Definindo o componente PostsComponent
@Component({
  selector: 'app-posts', // Seletor do componente
  templateUrl: './posts.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./posts.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe PostsComponent
export class PostsComponent {
  @Input() posts: any[] = [];
  error: any;
  isLoading: boolean = false;
  userId: number = 0;

  constructor(private authService: AuthService, private postService: PostService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.userId = user?.id; // Supondo que o objeto de usuário tenha um campo 'id'
      if (this.userId) {
        this.getPosts();
      }
    });
    this.postService.postCreated$.subscribe(() => {
      this.getPosts();
    });
  }

  getPosts(): void {
    this.isLoading = true;
    this.postService.getPosts(this.userId).subscribe(
      (data:any) => {
        this.posts = data.posts;
        this.isLoading = false;
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  handlePostDeleted(deletedPostId: number): void {
    // Remova a postagem da lista local
    this.posts = this.posts.filter((post) => post.id !== deletedPostId);
  }



}
