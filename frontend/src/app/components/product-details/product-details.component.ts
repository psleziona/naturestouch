import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../_services/product.service';
import { Product } from '../../_models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from "../../_services/cart.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productService.getProduct(id).subscribe({
        next: (product) => this.product = product,
        error: (err) => console.error('Failed to load product', err)
      });
    });
  }

  addToCart(product: Product | undefined): void {
    if (!product || !product.idProduct) {
      console.error('Product ID is missing or product is undefined');
      return;
    }
    this.cartService.addProductToCart(product.idProduct).subscribe({
      next: () => console.log('Product added to cart.'),
      error: (err) => console.error('Failed to add product to cart', err)
    });
  }

  addToObserved(product: Product | undefined): void {
    if (!product || !product.idProduct) {
      console.error('Product ID is missing or product is undefined');
      return;
    }
    this.productService.addProductToObserved(product.idProduct).subscribe({
      next: () => console.log('Product added to observed list.'),
      error: (err) => console.error('Failed to add product to observed', err)
    });
  }
}
