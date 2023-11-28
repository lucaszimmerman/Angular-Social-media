import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  makeRequest(url: string, method: string, data?: any):Observable<any>{
    const fullUrl = `${this.apiUrl}${url}`;
    const options: any = {
      withCredentials: true, // Se necessário
    };

    switch (method) {
      case 'GET':
        return this.http.get(fullUrl, options);
      case 'POST':
        return this.http.post(fullUrl, data, options);
      // Adicione outros métodos conforme necessário
      default:
        throw new Error(`Método não suportado: ${method}`);
    }
  }
}
