import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postCreatedSubject = new Subject<void>();
  private apiUrl = 'http://localhost:3000/api'; // Adapte conforme necessário
  // Observable associado ao Subject
  postCreated$ = this.postCreatedSubject.asObservable();


  constructor(private http: HttpClient) {}

  getPosts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/post/${userId}`).pipe(
      tap(() => {
      })
    )}



  // Método para notificar a criação de uma nova postagem
  notifyPostCreated() {
    this.postCreatedSubject.next();
  }

  addPost(desc: string, img: File | null | string, userId: number): Observable<any> {
    const newPost = { desc, img, userId };

    return this.http.post<any>(`${this.apiUrl}/post`, newPost);
  }

  deletePost(id: number): Observable<any> {
    const url = `${this.apiUrl}/post/${id}`;

    return this.http.delete<any>(url);
  }


}
