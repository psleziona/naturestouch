import { Routes } from '@angular/router';
import {AddProductComponent} from "./components/add-product/add-product.component";
import {CartComponent} from "./components/cart/cart.component";
import {OrderFormComponent} from "./components/order-form/order-form.component";
import {AuthGuard} from "./_guard/auth.guard";
import {ProductStatisticsComponent} from "./components/product-statistics/product-statistics.component";
import {OrderSummaryComponent} from "./components/order-summary/order-summary.component";
import {AdminGuard} from "./_guard/admin.guard";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {OrderDetailsComponent} from "./components/order-details/order-details.component";
import {OrderHistoryComponent} from "./components/order-history/order-history.component";
import {ObservedComponent} from "./components/observed/observed.component";
import {UserDataEditComponent} from "./components/user-data-edit/user-data-edit.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [
  { path: 'products', component: ProductListComponent},
  { path: 'product/:id', component: ProductDetailsComponent, canActivate: [AuthGuard]},
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'cart', component: CartComponent },
  { path: 'order-form', component: OrderFormComponent },
  { path: 'order/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard]},
  { path: 'observed', component: ObservedComponent, canActivate: [AuthGuard]},
  { path: 'user-data-edit', component: UserDataEditComponent, canActivate: [AuthGuard]},
  { path: 'product-statistics', component: ProductStatisticsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'order-summary/:idOrder', component: OrderSummaryComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
