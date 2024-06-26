import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Cart } from '../_models/cart.model';
import {iterator} from "rxjs/internal/symbol/iterator";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';
  onCartChange : EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl);
  }

  addProductToCart(idProduct: number | undefined): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add/${idProduct}`, {});
  }

  deleteProductFromCart(idProduct: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idProduct}`);
  }

    updateCartItem(idProduct: number | undefined, quantity: number): Observable<void> {
      return this.http.post<void>(`${this.apiUrl}/set/${idProduct}/${quantity}`, {});
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear`);
  }
}
