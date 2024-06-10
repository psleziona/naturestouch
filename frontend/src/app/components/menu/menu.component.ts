import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {StorageService} from "../../_services/storage.service";
import {CartIconComponent} from "../cart-icon/cart-icon.component";
import {ProductService} from "../../_services/product.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    CartIconComponent,
    NgForOf
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  productCategories? : string[];
  constructor(public storageService: StorageService, private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductCategories().subscribe(
      categories => this.productCategories = categories,
    )
  }
}
