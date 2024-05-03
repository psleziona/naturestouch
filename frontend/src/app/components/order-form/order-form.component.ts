import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from "../../_services/auth.service";
import {User} from "../../_models/user.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm?: FormGroup;
  currentUser?: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.orderForm = this.formBuilder.group({
          firstName: [user.firstName, Validators.required],
          lastName: [user.lastName, Validators.required],
          email: [user.email, [Validators.required, Validators.email]],
          address: this.formBuilder.group({
            street: ['', Validators.required],
            city: ['', Validators.required],
            zipCode: ['', Validators.required]
          }),
          paymentMethod: ['', Validators.required]
        });
      }
    });
  }

  onSubmit(): void {
    if (this.orderForm?.valid) {
      console.log('Submitting order:', this.orderForm.value);
    } else {
      alert('Formularz jest wypełniony nieprawidłowo');
    }
  }
}
