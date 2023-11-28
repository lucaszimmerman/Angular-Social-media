import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentCreated = new Subject<number>();
  private apiUrl = 'http://localhost:3000/api'; // Adapte conforme necessário


  constructor(private http: HttpClient) {}

  getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/comment/${postId}`).pipe(
      tap(() => {
        // Após obter os comments, notifique sobre a atualização
        this.commentCreated.next(postId);
      })
    )}


  addComment(desc: string, userId: number, postId: number): Observable<any> {
    const newComment = { desc,userId, postId };

    return this.http.post<any>(`${this.apiUrl}/comment`, newComment);
  }

  deleteComment(id: number): Observable<any> {
    const url = `${this.apiUrl}/comment/${id}`;

    return this.http.delete<any>(url);
  }

}
