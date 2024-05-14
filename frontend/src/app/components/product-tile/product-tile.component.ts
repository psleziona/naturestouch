import {Component, Input} from '@angular/core';
import {Product} from "../../_models/product.model";
import {RouterLink} from "@angular/router";
import {StorageService} from "../../_services/storage.service";
import {CartService} from "../../_services/cart.service";
import {ProductService} from "../../_services/product.service";

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.css'
})
export class ProductTileComponent {
  @Input({required: true}) product!: Product;
  constructor(public storageService: StorageService,
              private cartService: CartService,
              private productService: ProductService) {}

  addToCart(idProduct: number | undefined) {
    this.cartService.addProductToCart(idProduct).subscribe({
      next: () => this.cartService.onCartChange.emit(''),
      error: (err) => console.error('Failed to add product to cart', err)
    });
  }

  addToObserved(idProduct: number | undefined) {
    this.productService.addProductToObserved(idProduct).subscribe({
      next: () => () => this.cartService.onCartChange.emit(''),
      error: (err) => console.error('Failed to add product to observed', err)
    });
  }
}
