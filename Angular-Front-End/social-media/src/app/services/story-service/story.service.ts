// Importando o módulo necessário do Angular
import { Injectable } from '@angular/core';

// Decorador Injectable para o serviço StoryService
@Injectable({
  providedIn: 'root' // Disponibiliza o serviço em toda a aplicação
})
// Exportando a classe StoryService
export class StoryService {

  // Método para obter histórias
  getStories() {
    return [ // Retornando um array de objetos de histórias
      {
        id: 1,
        name: "Lucas Zimmerman",
        img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      },
      {
        id: 2,
        name: "Lucas Zimmerman",
        img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      },
      {
        id: 3,
        name: "Lucas Zimmerman",
        img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      },
      {
        id: 4,
        name: "Lucas Zimmerman",
        img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      },
    ]; // Definindo objetos de histórias com ID, nome e URL da imagem
  }
}
