import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../_services/order.service";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../_models/order.model";


@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {
  order?: Order;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idOrder = parseInt(params.get('idOrder') || '0', 10);
      if (idOrder) {
        this.loadOrder(idOrder);
      } else {
        console.error('Invalid order ID.');
      }
    });
  }

  loadOrder(idOrder: number): void {
    this.orderService.getOrder(idOrder).subscribe(
      order => {
        this.order = order;
      },
      error => {
        console.error('An error occurred while fetching the order:', error);
      }
    );
  }

  getTotal(): number {
    if (!this.order || !this.order.products) return 0;
    return this.order.products.reduce((total, item) => total + (item.quantity * item.product.price), 0);
  }

}
