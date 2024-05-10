import {Component} from '@angular/core';
import {OrderService} from "../../_services/order.service";
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../_models/order.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  order?:Order;

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderService.getOrder(this.route.snapshot.params['id']).subscribe(
      order => this.order = order
    )
  }
}
