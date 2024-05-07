import { Product } from './product.model';

export interface Comment {
  idComment: number;
  comment: string;
  rate: number;
  dateTime: string;
}
