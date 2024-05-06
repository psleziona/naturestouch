import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";
import {User} from "../../_models/user.model";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    street: new FormControl(''),
    houseNumber: new FormControl(''),
    city: new FormControl(''),
    zipcode: new FormControl('')

  });

  constructor(private authService: AuthService) {}

  register() {
    const user : User = {
      firstName: this.registerForm.value.firstName ?? '',
      lastName: this.registerForm.value.lastName ?? '',
      email: this.registerForm.value.email ?? '',
      password: this.registerForm.value.password ?? '',
      street: this.registerForm.value.street ?? '',
      houseNumber: this.registerForm.value.houseNumber ?? '',
      city: this.registerForm.value.city ??  '',
      zipcode: this.registerForm.value.zipcode ?? '',
    }
    this.authService.register(user).subscribe(res => window.location.reload());
  }
}
