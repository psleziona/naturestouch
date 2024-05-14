import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";
import {StorageService} from "../../_services/storage.service";
import {Router} from "@angular/router";
import {CartService} from "../../_services/cart.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthService,private storageService: StorageService, private router: Router) {}

  login() {
    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authService.login(body).subscribe({
      next: x => {
        const tokenParts = x['token'].split('.');
        const encodedPayload = tokenParts[1];
        const decodedPayload = JSON.parse(atob(encodedPayload));
        decodedPayload['token'] = x['token'];
        this.storageService.saveUser(decodedPayload);
        this.router.navigateByUrl("/");
      },
      error: err => alert("Błędne dane")
    });
  }
}
