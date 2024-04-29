import { Product } from './product.model';
import { Cart } from './cart.model';
import { Order } from './order.model';

export interface QuantityProduct {
  idCartProduct: number;
  product: Product;
  quantity: number;
  cart?: Cart;
  order?: Order;
}
