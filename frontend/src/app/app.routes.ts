import { Routes } from '@angular/router';
import {AddProductComponent} from "./components/add-product/add-product.component";
import {CartComponent} from "./components/cart/cart.component";

export const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'cart', component: CartComponent }
];
