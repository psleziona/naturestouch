import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../_services/product.service";
import { Product } from "../../_models/product.model";
import { ProductTileComponent } from "../product-tile/product-tile.component";
import { NgForOf, CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductTileComponent,
    NgForOf,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  sortOrder: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(res => {
        this.products = res;
      });
  }

  sortProducts(): void {
    switch (this.sortOrder) {
      case 'name-asc':
        this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        this.products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.products.sort((a, b) => b.price - a.price);
        break;
    }
  }
  addToObserved(idProduct: number | undefined): void {
    if (idProduct === undefined) {
      console.error('Product ID is undefined');
      return;
    }
    this.productService.addProductToObserved(idProduct).subscribe({
      next: () => alert('Product added to observed list.'),
      error: (err) => console.error('Failed to add product to observed', err)
    });
  }


}
