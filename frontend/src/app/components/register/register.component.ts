import {Component} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {User} from "../../_models/user.model";
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {StorageService} from "../../_services/storage.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule]
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private storageService: StorageService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required]
      })
  }

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
    this.authService.register(user).subscribe({
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
