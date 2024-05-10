import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../_models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  createOrder() {
    return this.http.post(`${this.apiUrl}`, {});
  }

  getOrder(idOrder: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${idOrder}`);
  }

  cancelOrder(idOrder: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/cancel/${idOrder}`, {});
  }
}
