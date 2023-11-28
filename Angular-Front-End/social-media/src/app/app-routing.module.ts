// Importando módulos do Angular necessários
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importando os componentes para as rotas
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuard } from './auth.guard'; // Importando o AuthGuard para proteger as rotas

// Definindo as rotas
const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Rota para o componente de login
  { path: 'cadastro', component: CadastroComponent }, // Rota para o componente de cadastro
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Rota vazia redireciona para a rota 'home'
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Rota para o componente da página inicial, protegida pelo AuthGuard
  { path: 'perfil/:id', component: PerfilComponent, canActivate: [AuthGuard] } // Rota para o componente de perfil, com parâmetro de ID e protegida pelo AuthGuard
];

// Definindo o módulo de roteamento
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importando as rotas para o módulo de roteamento
  exports: [RouterModule] // Exportando o módulo de roteamento para uso externo
})
export class AppRoutingModule {

}
