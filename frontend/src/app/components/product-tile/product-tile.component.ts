import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../_models/product.model";
import {Router, RouterLink} from "@angular/router";
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
  @Output() onAdd = new EventEmitter();
  constructor(public storageService: StorageService,
              private cartService: CartService,
              private productService: ProductService,
              private router: Router) {}

  addToCart(idProduct: number | undefined) {
    this.cartService.addProductToCart(idProduct).subscribe({
      next: () => {
        this.cartService.onCartChange.emit('');
        this.onAdd.emit('Dodano do koszyka')
      },
      error: (err) => {
        if(!this.storageService.isLoggedIn())
          this.router.navigateByUrl('/login')
      }
    });
  }

  addToObserved(idProduct: number | undefined) {
    this.productService.addProductToObserved(idProduct).subscribe({
      next: () => this.onAdd.emit('Dodano do obserwowanych'),
      error: (err) => {
        if(!this.storageService.isLoggedIn())
          this.router.navigateByUrl('/login')
      }
    });
  }
}
