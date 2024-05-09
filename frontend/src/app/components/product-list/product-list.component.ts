import { Component } from '@angular/core';
import {ProductService} from "../../_services/product.service";
import {Product} from "../../_models/product.model";
import {ProductTileComponent} from "../product-tile/product-tile.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductTileComponent,
    NgForOf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products!: Product[];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(res => {
        this.products = res;
      });
  }
}
