import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductService } from '../../_services/product.service';
import { Product } from '../../_models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from "../../_services/cart.service";
import {StorageService} from "../../_services/storage.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  lowestPriceLast30Days: number | undefined;
  showAlert = false;
  alertMsg = '';
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    public storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productService.getProduct(id).subscribe({
        next: (product) => {
          this.product = product;
          this.calculateLowestPrice();
        },
        error: (err) => console.error('Failed to load product', err)
      });
    });
  }
  calculateLowestPrice(): void {
    if (!this.product || !this.product.priceHistories || this.product.priceHistories.length === 0) {
      return;
    }
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const pricesLast30Days = this.product.priceHistories
      .filter(history => new Date(history.date) >= thirtyDaysAgo)
      .map(history => history.price);

    if (pricesLast30Days.length > 0) {
      this.lowestPriceLast30Days = Math.min(...pricesLast30Days);
    } else {
      this.lowestPriceLast30Days = undefined;
    }
  }


  addToCart(product: Product | undefined): void {
    if (!product || !product.idProduct) {
      console.error('Product ID is missing or product is undefined');
      return;
    }

    this.cartService.addProductToCart(product.idProduct).subscribe({
      next: () => {
        this.cartService.onCartChange.emit('');
        this.showAlertInfo("Produkt dodano do koszyka");
      },
      error: (err) => {
        if(!this.storageService.isLoggedIn())
          this.router.navigateByUrl('/login')
      }
    });
  }

  addToObserved(product: Product | undefined): void {
    if (!product || !product.idProduct) {
      console.error('Product ID is missing or product is undefined');
      return;
    }
    this.productService.addProductToObserved(product.idProduct).subscribe({
      next: () => this.showAlertInfo("Produkt dodano do obserwowanych"),
      error: (err) => {
        if(!this.storageService.isLoggedIn())
          this.router.navigateByUrl('/login')
      }
    });
  }

  showAlertInfo(info: string) {
    this.showAlert = true;
    this.alertMsg = info;
    setTimeout(() => {
      this.showAlert = false
    }, 300)
  }
}
