// Importando os módulos e componentes necessários do Angular
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './services/auth.service/auth.service';

// Decorador Injectable para o serviço AuthGuard
@Injectable({
  providedIn: 'root' // Disponibiliza o serviço em toda a aplicação
})
// Exportando a classe AuthGuard que implementa a interface CanActivate
export class AuthGuard implements CanActivate {
  currentUser: boolean = false; // Definindo o estado atual do usuário (para demonstração)

  // Injetando o serviço de roteamento Router no construtor
  constructor(private authService: AuthService, private router: Router) {}

  // Implementando o método canActivate para verificar se o usuário está autenticado
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    this.currentUser = this.authService.currentUserValue;

    if (!this.currentUser) { // Verificando se o usuário está autenticado
      return this.router.parseUrl('/login'); // Redirecionando para a página de login caso o usuário não esteja autenticado
    }
    return true; // Permitindo o acesso caso o usuário esteja autenticado
  }
}
