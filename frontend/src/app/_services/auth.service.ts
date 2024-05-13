import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../_models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/auth';
  constructor(private http: HttpClient) { }

  login(body: Object) {
    return this.http.post<any>(this.authUrl + "/login", body);
  }

  register(client: User) {
    return this.http.post<any>(this.authUrl + "/register", client);
  }

  editUserData(user: User) {
    return this.http.put<User>(this.authUrl + "/user/edit", user);
  }

  getCurrentUserData() {
    return this.http.get<User>(this.authUrl + "/user");
  }

  changePassword(body: Object) {
    return this.http.post(this.authUrl + "/passwordChange", body);
  }
}
