import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.css'
})
export class CartIconComponent {
  cartItems = 2;
}
