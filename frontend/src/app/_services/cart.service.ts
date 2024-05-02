import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../_models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl);
  }

  addProductToCart(idProduct: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add/${idProduct}`, {});
  }

  deleteProductFromCart(idProduct: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idProduct}`);
  }

  updateCartItem(idProduct: number, quantity: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/set/${idProduct}/${quantity}`, {});
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear`);
  }
}
