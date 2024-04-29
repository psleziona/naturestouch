import { Cart } from './cart.model';
import { Order } from './order.model';
import { Role } from './role.enum';

export interface User {
  idUser: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  street: string;
  houseNumber: string;
  city: string;
  zipcode: string;
  role: Role;
  cart?: Cart;
  orders?: Order[];
}
