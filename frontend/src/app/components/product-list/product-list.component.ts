import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../_services/product.service";
import { Product } from "../../_models/product.model";
import { ProductTileComponent } from "../product-tile/product-tile.component";
import { NgForOf, CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Route, Router, RouterModule} from '@angular/router';
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
  filteredProducts: Product[] = [];
  sortOrder: string = '';
  minPrice : number = 0;
  maxPrice : number = 0;
  minPriceStart : number = 0;
  maxPriceStart : number = 0;
  category = '';
  showAlert = false;
  alertMsg = '';

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      x =>{
        this.category = x['category'];
        this.loadProducts();
      }
    )
  }

  loadProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res.filter(p => p.category === this.category);
      this.filteredProducts = this.products;
      this.setPriceRange();
    });
  }

  setPriceRange() {
    this.minPrice = Math.min.apply(null, this.products.map(p => p.price));
    this.maxPrice = Math.max.apply(null, this.products.map(p => p.price));
    this.minPriceStart = this.minPrice;
    this.maxPriceStart = this.maxPrice;
  }

  filterByPrice(p: Product[]) {
    return p.filter(product => product.price >= this.minPrice && product.price <= this.maxPrice);
  }

  sortProducts(p: Product[]) {
    this.filteredProducts = p.sort((a, b) => {
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


  filterProducts() {
    this.sortProducts(this.filterByPrice(this.products));
  }

  showAlertInfo(info: string) {
    this.showAlert = true;
    this.alertMsg = info;
    setTimeout(() => {
      this.showAlert = false
    }, 300)
  }

}
