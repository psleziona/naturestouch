import { Routes } from '@angular/router';
import {AddProductComponent} from "./components/add-product/add-product.component";
import {CartComponent} from "./components/cart/cart.component";
import {OrderFormComponent} from "./components/order-form/order-form.component";

export const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order-form', component: OrderFormComponent },
];
