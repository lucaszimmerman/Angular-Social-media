import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  private apiUrl = 'http://localhost:3000/api'; // Adapte conforme necessário

  constructor(private http: HttpClient) { }

  getRelationships(followedUser: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/relationships/${followedUser}`)
  }

  addRelationship(followerUserId: number, followedUserId: number): Observable<any> {
    const newRelationship = { followerUserId, followedUserId };

    return this.http.post<any>(`${this.apiUrl}/relationships`, newRelationship);
  }

  deleteRelationship(followerUser: number, followedUser: number): Observable<any> {
    // Ajuste a URL conforme necessário para incluir userId e postId
    const url = `${this.apiUrl}/relationships/${followerUser}/${followedUser}`;


    return this.http.delete<any>(url);
  }


}
