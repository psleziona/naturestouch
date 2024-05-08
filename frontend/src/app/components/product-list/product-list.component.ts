import { Component } from '@angular/core';
import {ProductService} from "../../_services/product.service";
import {Product} from "../../_models/product.model";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
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
