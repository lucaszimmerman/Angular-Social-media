// Importando o módulo necessário do Angular e os ícones do Font Awesome, e o serviço AuthService
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/services/post.service/post.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service/user.service';

// Definindo o componente ShareComponent
@Component({
  selector: 'app-share', // Seletor do componente
  templateUrl: './share.component.html', // Arquivo de modelo HTML associado ao componente
  styleUrls: ['./share.component.css'] // Arquivo de estilo CSS associado ao componente
})
// Exportando a classe ShareComponent
export class ShareComponent {
  // Definindo os ícones do Font Awesome para o componente de compartilhamento
  locationIcon = faMap;
  imageIcon = faImage;
  tagFriendIcon = faTag;

  currentUser: any; // Variável para armazenar informações do usuário atual
  desc: string = '';
  file: File | null | string = null;
  isLoading: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;
  filePreview: string | null = null;

  // Injetando o serviço AuthService no construtor
  constructor(private authService: AuthService, private postService: PostService,  private http: HttpClient, private userService: UserService) {
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

  async upload(): Promise<string> {
    try {
      if (!this.file) {
        return ''; // Retorna uma string vazia se não houver arquivo
      }

      const formData = new FormData();
      formData.append('file', this.file as File);
      const res: any = await this.http.post('http://localhost:3000/api/upload', formData).toPromise();
      return res.filename;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async handleClick(e: Event): Promise<void> {
    e.preventDefault();
    try {
      let imgUrl = await this.upload(); // Agora imgUrl pode ser uma string vazia se não houver arquivo
      console.log('Image URL:', imgUrl);


      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      // Envie a postagem com a descrição e/ou imagem, dependendo do que estiver disponível
      this.postService.addPost(this.desc, imgUrl, this.currentUser.id).subscribe(
        (data) => {
          this.successMessage = 'Post has been created successfully.';
          this.isLoading = false;
          this.desc = ''; // Limpa o campo de descrição
          this.file = null; // Limpa o arquivo selecionado
          this.filePreview = null; // Limpe a prévia da imagem também

          this.postService.notifyPostCreated();
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

  handleFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      this.file = files[0];
      this.filePreview = URL.createObjectURL(this.file);
    }
  }
}
