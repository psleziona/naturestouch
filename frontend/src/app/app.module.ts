import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';


import { AuthService } from './_services/auth.service';
import { ProductService } from './_services/product.service';
import { OrderService } from './_services/order.service';
import {CartService} from "./_services/cart.service";
import {CommentService} from "./_services/comment.service";
import {ImageService} from "./_services/image.service";
import {AuthInterceptor} from "./_interceptor/auth.interceptor";
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RegisterComponent} from "./components/register/register.component";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    ProductService,
    OrderService,
    CartService,
    ImageService,
    CommentService,
    AuthInterceptor
  ],
})
export class AppModule { }
