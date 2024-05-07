import {Component} from '@angular/core';
import {ProductService} from "../../_services/product.service";
import {Product} from "../../_models/product.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-observed',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './observed.component.html',
  styleUrl: './observed.component.css',
})
export class ObservedComponent {
  observed!: Product[];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getObservedProducts()
      .subscribe(res => {
        this.observed = res;
        console.log(res);
      });
  }
}
