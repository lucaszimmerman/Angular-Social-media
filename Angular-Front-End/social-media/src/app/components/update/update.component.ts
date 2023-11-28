import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  cloudIcon =  faCloud
  currentUser:any;
  @Input() openUpdate = false;
  @Input() user: any = null;
  coverFile: File | null = null;
  profileFile: File | null = null;
  name: string = '';
  city: string = '';
  website: string = '';
  texts: { [key: string]: string } = {};
  error: any;

  constructor(private authService: AuthService,private http: HttpClient, private userService: UserService){
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user; // Atualizando a variável currentUser com o usuário atual
      this.getUser(this.currentUser.id)
      console.log(this.currentUser);
    });
  }

  getUser(userId:number): void {
    // Chame o serviço para obter comentários, passando o ID do post associado
    this.userService.getUser(userId).subscribe(
      (data: any) => {
        this.user = data;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  async upload(file: File): Promise<string> {
    try {
      if (!file) {
        return ''; // Retorna uma string vazia se não houver arquivo
      }
      const formData = new FormData();
      formData.append('file', file, file.name);  // Certifique-se de adicionar o nome do arquivo

      // Faz a requisição POST e aguarda a resposta
      const res: any = await this.http.post('http://localhost:3000/api/upload', formData).toPromise();

      // Verifica se a resposta contém um campo 'filename' ou outra propriedade que contenha o nome do arquivo
      const filename = res.filename || res.yourCustomFilenameProperty;

      console.log(filename);
      return filename || ''; // Retorna uma string vazia se o nome do arquivo não estiver disponível
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    try {
    // Verifique se a imagem de capa foi alterada
    let coverUrl = this.coverFile ? await this.upload(this.coverFile) : this.user.coverPic;
    console.log(coverUrl);

    // Verifique se a imagem de perfil foi alterada
    let profileUrl = this.profileFile ? await this.upload(this.profileFile) : this.user.profilePic;

      // Atualize o usuário com os novos dados
      await this.userService.updateUser(this.user.id, {
        name: this.user.name,
        city: this.user.city,
        website: this.user.website,
        profilePic: profileUrl,
        coverPic: coverUrl
      }).subscribe(
        (data) => {
          // Atualize sua interface do usuário conforme necessário
          console.log(data);
        },
        (error) => {
          console.error('Error updating user:', error);
          // Trate o erro conforme necessário
        }
      );

      // Limpe os campos após a atualização
      this.name = ''
      this.city = ''
      this.website = ''
      this.coverFile = null;
      this.profileFile = null;
      this.openUpdate = false; // Feche o modal de atualização, se necessário

    } catch (err) {
      console.error(err);
    }
  }

  openUpdateComponent(): void {
    this.openUpdate = !this.openUpdate;
  }

  handleChange(event: any, field: string): void {
    console.log(`User ${field} changed: ${this.user[field]}`);
    this.texts[field] = event.target.value;
  }

  handleFileInput(event: any, field: string): void {
    const file = event.target.files[0];

    if (field === 'cover') {
      this.coverFile = file;
      console.log(this.coverFile);
    } else if (field === 'profile') {
      this.profileFile = file;
    }
  }
}
