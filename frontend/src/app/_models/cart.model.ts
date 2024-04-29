import { QuantityProduct } from './quantity-product.model';

export interface Cart {
  idCart: number;
  products: QuantityProduct[];
}
