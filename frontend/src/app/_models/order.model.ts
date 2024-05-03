import { OrderStatus } from './order-status.enum';
import { User } from './user.model';
import { QuantityProduct } from './quantity-product.model';

export interface Order {
  idOrder: number;
  dateTime: string;
  status: OrderStatus;
  buyer: User;
  products: QuantityProduct[];
  paymentMethod: string;
}
