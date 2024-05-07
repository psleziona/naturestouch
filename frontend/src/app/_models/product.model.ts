import {ProductPriceHistory} from "./productPriceHistory.model";

export interface Product {
  idProduct?: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  ingredients: string;
  filename: string;
  comments?: Comment[];
  priceHistories?: ProductPriceHistory[]
}
