// Importando os módulos e componentes necessários do Angular
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Decorador Injectable para o serviço DarkModeService
@Injectable({
  providedIn: 'root' // Disponibiliza o serviço em toda a aplicação
})
// Exportando a classe DarkModeService
export class DarkModeService {

  // Criando um BehaviorSubject para o modo escuro, inicializando com base no valor armazenado no localStorage
  darkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem('darkMode') === 'true');

  // Construtor do serviço DarkModeService
  constructor() {
    // Assinando as alterações do modo escuro para atualizar o valor no localStorage
    this.darkMode.subscribe(value => localStorage.setItem('darkMode', value.toString()));
  }

  // Método para alternar o modo escuro
  toggleDarkMode() {
    this.darkMode.next(!this.darkMode.value); // Atualizando o valor do modo escuro para o oposto do valor atual
  }

}
