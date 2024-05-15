import {Component} from '@angular/core';
import {OrderService} from "../../_services/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../../_models/order.model";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  order?:Order;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.orderService.getOrder(this.route.snapshot.params['id']).subscribe(
      order => this.order = order
    )
  }

  backToOrderHistory() {
    this.router.navigateByUrl("/order-history");
  }

  cancelOrder(idOrder: number | undefined) {
    this.orderService.cancelOrder(idOrder).subscribe({
      next: () => this.router.navigateByUrl("/order-history"),
    })
  }
}
