import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import {MenuComponent} from "./components/menu/menu.component";
import {CartComponent} from "./components/cart/cart.component";
import {LoginComponent} from "./components/login/login.component";
import {ProductListComponent} from "./components/product-list/product-list.component";


const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: '', component: MenuComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
