import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../_models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comment';

  constructor(private http: HttpClient) { }

  addComment(idProduct: number, comment: Comment): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add/${idProduct}`, comment);
  }

  deleteComment(idComment: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idComment}`);
  }
}
