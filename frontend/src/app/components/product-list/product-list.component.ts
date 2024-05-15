import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../_services/product.service";
import { Product } from "../../_models/product.model";
import { ProductTileComponent } from "../product-tile/product-tile.component";
import { NgForOf, CommonModule } from "@angular/common";
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
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory = '';
  minPrice : number = 0;
  maxPrice : number = 0;
  minPriceStart : number = 0;
  maxPriceStart : number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
      this.filteredProducts = res;
      this.extractCategories();
      this.setPriceRange();
    });
  }

  setPriceRange() {
    this.minPrice = Math.min.apply(null, this.products.map(p => p.price));
    this.maxPrice = Math.max.apply(null, this.products.map(p => p.price));
    this.minPriceStart = this.minPrice;
    this.maxPriceStart = this.maxPrice;
  }

  filterByCategory() {
    if (!this.selectedCategory || this.selectedCategory === '') {
      this.filteredProducts = [...this.products]; // Resets to the full list
    } else {
      this.filteredProducts = this.products.filter(p => p.category === this.selectedCategory);
    }
    this.sortProducts();
  }

  extractCategories() {
    const categorySet = new Set(this.products.map(p => p.category));
    this.categories = Array.from(categorySet);
  }

  sortProducts() {
    this.filteredProducts = this.filteredProducts.sort((a, b) => {
      switch (this.sortOrder) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }

  toggleFilters(e: Event) {
      // @ts-ignore
    e.target.classList.toggle('open');
  }

  filterByPrice() {
    this.filteredProducts = this.products.filter(p => p.price >= this.minPrice && p.price <= this.maxPrice);
    this.sortProducts();
  }
}
