import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from "../../_services/auth.service";
import {User} from "../../_models/user.model";
import {NgForOf, NgIf} from "@angular/common";
import {OrderService} from "../../_services/order.service";
import {Router} from "@angular/router";
import {CartService} from "../../_services/cart.service";
import {Cart} from "../../_models/cart.model";

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  currentUser?: User;
  cart? : Cart;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserData().subscribe(user => this.currentUser = user);
    this.cartService.getCartItems().subscribe(cart => this.cart = cart);
  }

  onSubmit(): void {
    this.orderService.createOrder().subscribe(
      order => {
        this.router.navigateByUrl('/order-history');
      },
      error => {
        console.error('An error occurred while creating order:', error);
      }
    );
  }

}
