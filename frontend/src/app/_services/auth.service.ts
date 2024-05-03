import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    const userJson = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(userJson ? JSON.parse(userJson) : null);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdministrator(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser && currentUser.role === 'ADMIN';
  }

  getToken(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.token : null;
  }
}
