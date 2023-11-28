import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private likesUpdated = new Subject<void>();
  private apiUrl = 'http://localhost:3000/api'; // Adapte conforme necessário

  constructor(private http: HttpClient) { }

  getLikes(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/likes/${postId}`)
  }

  addLike(userId: number, postId: number): Observable<any> {
    const newLike = { userId, postId };

    return this.http.post<any>(`${this.apiUrl}/likes`, newLike);
  }

  deleteLike(userId: number, postId: number): Observable<any> {
    // Ajuste a URL conforme necessário para incluir userId e postId
    const url = `${this.apiUrl}/likes/${userId}/${postId}`;

    return this.http.delete<any>(url);
  }

    notifyLikesUpdated(): void {
      this.likesUpdated.next();
    }


  onCommentsUpdated(): Observable<void> {
    return this.likesUpdated.asObservable();
  }
}
