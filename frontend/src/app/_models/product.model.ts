export interface Product {
  idProduct: number;
  name: string;
  price: number;
  quantity: number;
  lowestPriceInLast30Days: number;
  dateOfLowestPrice: string;
  category: string;
  ingredients: string;
  filename: string;
  comments?: Comment[];
}
