import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../_services/product.service';
import { Product } from '../../_models/product.model';
import {HttpClientModule} from "@angular/common/http";
import {ProductCategory} from "../../_models/product-category.enum";
import {ImageService} from "../../_services/image.service";

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
  filename = '';

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      ingredients: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      if (file.type.match('image.*')) {
        const img = new FormData();
        img.append("file", file);
        this.imageService.uploadImage(img)
          .subscribe(x => console.log(x))
      } else
        alert("Wybrany plik nie jest obrazem. Proszę wybrać plik obrazu.");
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const p : Product = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        quantity: this.productForm.value.quantity,
        category: this.productForm.value.category,
        ingredients: this.productForm.value.ingredients,
        filename: this.filename
      }

      this.productService.addProduct(p).subscribe({
        next: () => alert('Produkt został dodany pomyślnie!'),
        error: (error) => alert('Wystąpił błąd podczas dodawania produktu: ' + error.message)
      });
    } else {
      alert('Formularz zawiera błędy lub nie wybrano prawidłowego pliku!');
    }
  }
}
