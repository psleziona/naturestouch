import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(idProduct: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${idProduct}`);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, product);
  }


  changePrice(idProduct: number | undefined, price: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/price/${idProduct}/${price}`, {});
  }

  increaseProductQuantity(idProduct: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${idProduct}/${quantity}`, {});
  }

  deleteProduct(idProduct: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idProduct}`);
  }

  getObservedProducts() :Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/observed`);
  }

  addProductToObserved(idProduct: number) {
    return this.http.post(`${this.apiUrl}/observed/${idProduct}`, {});
  }
}
