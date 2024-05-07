import {Component, OnInit} from '@angular/core';
import {Product} from "../../_models/product.model";
import {ProductService} from "../../_services/product.service";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";
import {AuthService} from "../../_services/auth.service";


@Component({
  selector: 'app-product-statistics',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    CommonModule
  ],
  templateUrl: './product-statistics.component.html',
  styleUrl: './product-statistics.component.css'
})
export class ProductStatisticsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, protected authService: AuthService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => {
        console.error('An error occurred while fetching products:', error);
      }
    );
  }

  changePrice(idProduct: number | undefined, newPrice: number): void {
    this.productService.changePrice(idProduct, newPrice).subscribe(
      () => {
        console.log('Price changed successfully.');
        this.loadProducts();
      },
      (error: any) => {
        console.error('An error occurred while changing price:', error);
      }
    );
  }

  deleteProduct(idProduct: number | undefined): void {
    this.productService.deleteProduct(idProduct).subscribe(
      () => {
        console.log('Product deleted successfully.');
        this.loadProducts();
      },
      (error: any) => {
        console.error('An error occurred while deleting product:', error);
      }
    );
  }

}
