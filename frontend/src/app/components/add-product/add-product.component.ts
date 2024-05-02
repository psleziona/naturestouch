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
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  productCategories = Object.values(ProductCategory);
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService

  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      lowestPriceInLast30Days: ['', [Validators.min(0.01)]],
      dateOfLowestPrice: [''],
      category: ['', Validators.required],
      ingredients: ['', Validators.required],
      filename: ['']
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      if (file.type.match('image.*')) {
        this.selectedFile = file;
      } else {
        alert("Wybrany plik nie jest obrazem. Proszę wybrać plik obrazu.");
        this.selectedFile = null;
      }
    }
  }



  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('price', this.productForm.value.price.toString());
      formData.append('quantity', this.productForm.value.quantity.toString());
      formData.append('category', this.productForm.value.category);
      formData.append('ingredients', this.productForm.value.ingredients);

      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }

      this.productService.addProduct(formData).subscribe({
        next: () => alert('Produkt został dodany pomyślnie!'),
        error: (error) => alert('Wystąpił błąd podczas dodawania produktu: ' + error.message)
      });
    } else {
      alert('Formularz zawiera błędy lub nie wybrano prawidłowego pliku!');
    }
  }


}
