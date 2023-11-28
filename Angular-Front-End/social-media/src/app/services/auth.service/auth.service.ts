import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  register(username: string, email: string,  password: string, name: string): Observable<HttpResponse<any>> {
    const body = { username, email, password, name };

    return this.http.post(`http://localhost:3000/api/auth/register`, body, { observe: 'response' });
  }


  login(inputs: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/login', inputs, { withCredentials: true })
      .pipe(
        tap(response => {
          localStorage.setItem('user', JSON.stringify(response));
          this.currentUserSubject.next(response);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/logout', null, { withCredentials: true })
      .pipe(
        tap(() => {
          localStorage.removeItem('user');
          this.currentUserSubject.next(null);
        })
      );
  }



}
