import { Component } from '@angular/core';
import {OrderService} from "../../_services/order.service";
import {Order} from "../../_models/order.model";
import {DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    DatePipe
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  orders!: Order[];
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(
      res => this.orders = res
    );
  }

}
