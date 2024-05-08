import {Component} from '@angular/core';
import {ProductService} from "../../_services/product.service";
import {Product} from "../../_models/product.model";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-observed',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './observed.component.html',
  styleUrl: './observed.component.css'
})
export class ObservedComponent {
  observed!: Product[];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getObservedProducts()
      .subscribe(res => {
        this.observed = res;
      });
  }

  deleteFromObserved(idProduct: number | undefined) {
    this.productService.removeProductFromObserved(idProduct)
      .subscribe(res => {
        console.log(res);
      })
  }
}
