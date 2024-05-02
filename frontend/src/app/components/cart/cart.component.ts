import { Component, OnInit } from '@angular/core';
import { CartService } from "../../_services/cart.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {QuantityProduct} from "../../_models/quantity-product.model";

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

  constructor(private cartService: CartService) {}

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
    this.cartService.deleteProductFromCart(itemId).subscribe(() => this.loadCartItems());
  }

  changeQuantity(itemId: number, quantity: number) {
    this.cartService.updateCartItem(itemId, quantity).subscribe(() => this.loadCartItems());
  }
}
