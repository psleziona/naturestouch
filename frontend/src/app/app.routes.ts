import { Routes } from '@angular/router';
import {AddProductComponent} from "./components/add-product/add-product.component";
import {CartComponent} from "./components/cart/cart.component";
import {OrderFormComponent} from "./components/order-form/order-form.component";
import {AuthGuard} from "./_guard/auth.guard";
import {ProductStatisticsComponent} from "./components/product-statistics/product-statistics.component";
import {OrderSummaryComponent} from "./components/order-summary/order-summary.component";

export const routes: Routes = [
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
  { path: 'cart', component: CartComponent },
  { path: 'order-form', component: OrderFormComponent },
  {path: 'product-statistics', component: ProductStatisticsComponent, canActivate: [AuthGuard] },
  {path: 'order-summary/:idOrder', component: OrderSummaryComponent, canActivate:[AuthGuard]}
];
