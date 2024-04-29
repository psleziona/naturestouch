import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../_services/product.service';
import { Product } from '../../_models/product.model';
import {HttpClientModule} from "@angular/common/http";
import {ProductCategory} from "../../_models/product-category.enum";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent  {
  productForm: FormGroup;
  productCategories = Object.values(ProductCategory);

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      lowestPriceInLast30Days: ['', [Validators.min(0.01)]],
      dateOfLowestPrice: [''],
      category: ['', Validators.required],
      ingredients: ['', Validators.required],
      filename: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      this.productService.addProduct(product).subscribe({
        next: () => alert('Produkt został dodany pomyślnie!'),
        error: () => alert('Wystąpił błąd podczas dodawania produktu!')
      });
    }
  }
}
