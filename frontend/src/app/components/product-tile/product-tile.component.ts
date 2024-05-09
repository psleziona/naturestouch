import {Component, Input} from '@angular/core';
import {Product} from "../../_models/product.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.css'
})
export class ProductTileComponent {
  @Input({required: true}) product!: Product;
}
