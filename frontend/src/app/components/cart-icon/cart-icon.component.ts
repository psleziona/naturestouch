import { Component } from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {StorageService} from "../../_services/storage.service";
import {CartService} from "../../_services/cart.service";

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.css'
})
export class CartIconComponent {
  productsInCart?: number;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.updateCartCount();

    this.cartService.onCartChange.subscribe(_ => {
      this.updateCartCount();
    });
  }

  private updateCartCount() {
    this.cartService.getCartItems()
      .subscribe(cart => {
        this.productsInCart = cart.products.reduce((total, p) => total + p.quantity, 0);
      });
  }
}
