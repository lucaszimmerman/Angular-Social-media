// Importando os módulos e componentes do Angular necessários
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { RightBarComponent } from './components/right-bar/right-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './services/auth.service/auth.service';
import { DarkModeService } from './services/dark-mode/dark-mode.service';
import { StoriesComponent } from './components/stories/stories.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ShareComponent } from './components/share/share.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from './services/post.service/post.service';
import { CommentService } from './services/comment-service/comment.service';
import { RelationshipService } from './services/relationship.service/relationship.service';
import { LikesService } from './services/likes.service/likes.service';
import { UserService } from './services/user.service/user.service';
import { UpdateComponent } from './components/update/update.component';
import { PostPageComponent } from './pages/post-page/post-page.component';

// Decorador NgModule para o módulo AppModule
@NgModule({
  declarations: [
    AppComponent, // Componente principal
    LoginComponent, // Componente de login
    HomeComponent, // Componente da página inicial
    PerfilComponent, // Componente do perfil
    CadastroComponent, // Componente de cadastro
    NavBarComponent, // Componente da barra de navegação
    LeftBarComponent, // Componente da barra lateral esquerda
    RightBarComponent, // Componente da barra lateral direita
    StoriesComponent, // Componente de histórias
    PostsComponent, // Componente de posts
    PostComponent, // Componente de post individual
    CommentsComponent, // Componente de comentários
    ShareComponent, UpdateComponent, PostPageComponent // Componente de compartilhamento
  ],
  imports: [
    FormsModule,
    BrowserModule, // Módulo do navegador
    AppRoutingModule, // Módulo de roteamento
    FontAwesomeModule,// Módulo do FontAwesome para ícones
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, DarkModeService, AuthService, PostService,LikesService, UserService, CommentService, RelationshipService], // Provedores de serviços
  bootstrap: [AppComponent] // Componente de inicialização
})
// Exportando a classe do módulo AppModule
export class AppModule { }
