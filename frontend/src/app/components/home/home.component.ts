import { Component } from '@angular/core';
import {ProductService} from "../../_services/product.service";
import {Product} from "../../_models/product.model";
import {NgForOf, NgIf} from "@angular/common";
import {ProductTileComponent} from "../product-tile/product-tile.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ProductTileComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  lastProducts!: Product[];
  hotProducts!: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getLastProducts()
      .subscribe(res => this.lastProducts = res);

    this.productService.getHotProducts()
      .subscribe(res => this.hotProducts = res);
  }

}
