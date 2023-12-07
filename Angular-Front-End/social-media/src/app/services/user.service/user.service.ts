import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // Adapte conforme necessário

  constructor(private http: HttpClient) { }

  getUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`)
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user`)
  }

  updateUser(userId: number, updateData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/${userId}`, updateData)
      .pipe(
        map(response => response),
        catchError(error => {
          // Trate os erros aqui, você pode logar, notificar o usuário, etc.
          console.error('Error updating user:', error);
          throw error;
        })
      );
  }
}
