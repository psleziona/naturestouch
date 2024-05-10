import { Component, OnInit } from '@angular/core';
import { CartService } from "../../_services/cart.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {QuantityProduct} from "../../_models/quantity-product.model";
import {Router} from "@angular/router";
import {StorageService} from "../../_services/storage.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: QuantityProduct[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(cart => {
      this.cartItems = cart.products;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  }

  removeFromCart(itemId: number) {
    this.cartService.deleteProductFromCart(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.idCartProduct !== itemId);
        this.calculateTotal();
      },
      error: err => console.error('Failed to remove item', err)
    });
  }

  changeQuantity(itemId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
    } else {
      this.cartService.updateCartItem(itemId, quantity).subscribe({
        next: () => {
          const index = this.cartItems.findIndex(item => item.idCartProduct === itemId);
          if (index !== -1) {
            this.cartItems[index].quantity = quantity;
            this.calculateTotal();
          }
        },
        error: err => console.error('Error updating quantity', err)
      });
    }
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.cartItems = [];
      this.calculateTotal();
      console.log('Cart cleared');
    }, error => console.error('Failed to clear cart', error));
  }

  placeOrder() {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/order-form']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
