import { Component } from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../_models/user.model";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {StorageService} from "../../_services/storage.service";

@Component({
  selector: 'app-user-data-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './user-data-edit.component.html',
  styleUrl: './user-data-edit.component.css'
})
export class UserDataEditComponent {
  passwordChangeForm! : FormGroup;
  userDataChangeForm!: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private storageService: StorageService) {}

  ngOnInit() {
    this.authService.getCurrentUserData()
      .subscribe(res => {
        this.userDataChangeForm = this.fb.group({
          firstName: [res.firstName],
          lastName: [res.lastName],
          email: [res.email],
          city: [res.city],
          houseNumber: [res.houseNumber],
          zipcode: [res.zipcode],
          street: [res.street]
        });
      });

    this.passwordChangeForm = this.fb.group({
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  changePassword() {
    const pass1 = this.passwordChangeForm.value.password;
    const pass2 = this.passwordChangeForm.value.password2;
    if(pass1 === pass2 && this.passwordChangeForm.valid) {
      const body = {
        'email': '',
        'password': pass1
      }
      this.authService.changePassword(body)
        .subscribe(next => {
          this.storageService.logout();
          this.router.navigateByUrl("/");
        });
    } else
      alert('Hasła muszą być takie same i nie mogą być puste');
  }

  editUser() {
    const user : User = {
      firstName: this.userDataChangeForm.value.firstName,
      lastName: this.userDataChangeForm.value.lastName,
      email: this.userDataChangeForm.value.email,
      city: this.userDataChangeForm.value.city,
      houseNumber: this.userDataChangeForm.value.houseNumber,
      zipcode: this.userDataChangeForm.value.zipcode,
      street: this.userDataChangeForm.value.street
    }
  }
}
