// Importando os módulos necessários do Angular e os ícones do Font Awesome
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { formatDistanceToNow } from 'date-fns';
import { LikesService } from 'src/app/services/likes.service/likes.service';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { PostService } from 'src/app/services/post.service/post.service';
import { ptBR } from 'date-fns/locale';

// Definindo o componente PostComponent
@Component({
  selector: 'app-post', // Seletor do componente
  templateUrl: './post.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./post.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe PostComponent
export class PostComponent {
  // Definindo os ícones do Font Awesome para o componente de postagem
  configIcon = faEllipsis;
  likeIcon = regularHeart;
  likedIcon = solidHeart;
  commentIcon = faComment;
  shareIcon = faShareFromSquare;
  trashIcon = faTrash;


  @Output() postDeleted = new EventEmitter<number>();
  likes: any[] = [];
  comments: any[] = [];
  error: any;
  @Input() post: any; // Decorador de entrada para receber dados de postagem como entrada
  liked:boolean = false; // Variável para controlar o estado de gostar da postagem
  commentOpen: boolean = false; // Variável para controlar a exibição dos comentários
  settingsOpen: boolean = false;
  postId: number = 0;
  currentUser: any;
  isLoading: boolean = false;
  canDelete:boolean = false;

  constructor(private authService: AuthService, private likesService: LikesService, private commentService: CommentService, private postService: PostService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
      this.postId = this.post.id;
      this.getLikes(this.postId);
      this.getComments(this.postId)
      this.canDelete = this.post.userId == this.currentUser.id;
  }

  getComments(postId:number): void {
    this.isLoading = true;

    // Chame o serviço para obter comentários, passando o ID do post associado
    this.commentService.getComments(postId).subscribe(
      (data: any) => {
        this.comments = data.comments;
        this.isLoading = false;
      },
      (error: any) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }


  getLikes(postId:number): void {
    this.likesService.getLikes(postId).subscribe(
      (data: any) => {
        this.likes = data.likes;
        this.liked = this.likes.includes(this.currentUser.id);
        this.likesService.notifyLikesUpdated();
      },
      (error) => {
        this.error = error;
      }
    );
  }

  async handleLike(e: Event): Promise<void> {
    e.preventDefault();
    try {
      this.isLoading = true;
      if (this.liked) {
        // Se já curtiu, remova o like
        await this.likesService.deleteLike(this.currentUser.id, this.postId).toPromise();
      } else {
        // Se não curtiu, adicione o like
        await this.likesService.addLike(this.currentUser.id, this.postId).toPromise();
      }
      await this.getLikes(this.postId);
    } catch (err) {
      console.error(err);
    }finally {
      this.isLoading = false; // Encerre o carregamento, independentemente do resultado
    }
  }

  async handleDelete(e: Event): Promise<void> {
    e.preventDefault();
    try {
      this.isLoading = true;
      if (this.canDelete) {
        // Se já curtiu, remova o like
        await this.postService.deletePost(this.postId).subscribe(() => {
          // Atualize as condições e a interface do usuário após a operação bem-sucedida
          this.postDeleted.emit(this.postId);
        });
      } else {
        console.log("Impossível deletar pois você não é o usuário dono deste post");
      }
    } catch (err) {
      console.error(err);
    }finally {
      this.isLoading = false; // Encerre o carregamento, independentemente do resultado
    }
  }

  // Método para alternar a exibição dos comentários
  toggleCommentOpen() {
    this.commentOpen = !this.commentOpen; // Alterna o valor da variável commentOpen entre verdadeiro e falso
  }

  toggleSettingsOpen() {
    this.settingsOpen = !this.settingsOpen; // Alterna o valor da variável commentOpen entre verdadeiro e falso
  }

  formatDateToNow(date: Date): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR });
  }






}

