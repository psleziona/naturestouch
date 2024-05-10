import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from "../../_services/auth.service";
import {User} from "../../_models/user.model";
import {NgIf} from "@angular/common";
import {OrderService} from "../../_services/order.service";
import {Router} from "@angular/router";
import {StorageService} from "../../_services/storage.service";

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
    private authService: AuthService,
    private orderService: OrderService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if (this.currentUser && Object.keys(this.currentUser).length > 0) {
      this.orderForm = this.formBuilder.group({
        firstName: [this.currentUser.firstName || '', Validators.required],
        lastName: [this.currentUser.lastName || '', Validators.required],
        email: [this.currentUser.email || '', [Validators.required, Validators.email]],
        address: this.formBuilder.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          zipCode: ['', Validators.required]
        }),
        paymentMethod: ['', Validators.required]
      });
      console.log('Initial form values:', this.orderForm.value);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    if (this.orderForm?.valid) {
      console.log('Form values:', this.orderForm.value);
      this.orderService.createOrder(this.orderForm.value).subscribe(
        order => {
          console.log('Order created successfully.');
          this.router.navigate(['/order-summary', order.idOrder]);
        },
        error => {
          console.error('An error occurred while creating order:', error);
        }
      );
    } else {
      alert('Formularz jest wypełniony nieprawidłowo');
    }
  }

}
