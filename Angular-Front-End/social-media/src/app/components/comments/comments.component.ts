// Importando o módulo necessário do Angular e o serviço AuthService
import { Component, Input } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Definindo o componente CommentsComponent
@Component({
  selector: 'app-comments', // Seletor do componente
  templateUrl: './comments.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./comments.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe CommentsComponent
export class CommentsComponent {

  settingsIcon = faEllipsis;
  trashIcon = faTrash;
  comments: any[] = []; // Array para armazenar os comentários
  desc: string = '';
  error: any;
  isLoading: boolean = false;
  userId: number = 0;
  currentUser: any = null;
  @Input() postId: number = 0;
  canDelete: boolean = false;
  commentSettingsOpen: any = {};

  constructor(private authService: AuthService, private commentService: CommentService, private userService: UserService) {
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

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.userId = user?.id; // Supondo que o objeto de usuário tenha um campo 'id'
      if (this.userId) {
        this.getComments(this.postId);
      }
    });

    this.commentService.commentCreated.subscribe((postId: number) => {
      // Verifique se o postId corresponde ao postId deste componente
      if (postId === this.postId) {
        // Atualize os comentários
        this.getComments(this.postId);
      }
    });

  }

  getComments(postId:number): void {
    this.isLoading = true;

    // Chame o serviço para obter comentários, passando o ID do post associado
    this.commentService.getComments(postId).subscribe(
      (data: any) => {
        this.comments = data.comments;
        if (this.comments && this.comments.length > 0) {
          this.comments.forEach(comment => {
            comment.canDelete = comment.user.id === this.currentUser.id;
          });
        }
        this.isLoading = false;
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  async handleClick(e: Event): Promise<void> {
    e.preventDefault();
    try {
      if (!this.desc.trim()) {
        throw new Error('O comentário não pode ser vazio. Insira uma descrição.');
      }
      this.commentService.addComment(this.desc, this.currentUser.id, this.postId).subscribe(
        (data) => {
          this.desc = ''; // Limpa o campo de descrição
        },
        (error) => {
          this.error = 'Error creating post. Please try again.';
          this.isLoading = false;
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  async handleDelete(e: Event, commentId: number): Promise<void> {
    e.preventDefault();
    try {
      this.isLoading = true;
      const commentToDelete = this.comments.find(comment => comment.id === commentId);

      if (commentToDelete?.canDelete) {
        // Se o usuário pode deletar, chame o método de exclusão no serviço
        await this.commentService.deleteComment(commentId).subscribe(() => {
          // Atualize as condições e a interface do usuário após a operação bem-sucedida
          this.getComments(this.postId);
        });
      } else {
        console.log("Impossível deletar pois você não é o usuário dono deste comentário");
      }
    } catch (err) {
      console.error(err);
    }finally {
      this.isLoading = false; // Encerre o carregamento, independentemente do resultado
    }
  }


  toggleSettingsOpen(comment: any): void {
    this.commentSettingsOpen[comment.id] = !this.commentSettingsOpen[comment.id];
  }

  formatDateToNow(date: Date): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR });
  }
}
