import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {CartService} from "./cart.service";

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  loggedIn = new Subject<boolean>();
  cartItems = new BehaviorSubject<number>(1);
  constructor(private cartService: CartService) { }

  public getUserCart() {
    this.cartService.getCartItems()
      .subscribe(cart => {
        const cartItemsNumber = cart.products.reduce((total, next) => total + next.quantity, 0);
        this.cartItems.next(cartItemsNumber);
      });
  }

  public logout() {
    window.sessionStorage.clear();
    window.location.reload();
    this.loggedIn.next(false);
  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.loggedIn.next(true);
  }

  public getUser() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user)
      return JSON.parse(user);
    return {};
  }

  public getToken() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user) {
      const u = JSON.parse(user);
      return u['token'];
    }
  }

  public getExpirationDate() {
    return new Date(this.getUser()['exp'] * 1000);
  }

  public getRole() {
    return this.getUser()['role'];
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user)
      return true;
    return false;
  }

  public isAdmin() {
    return this.getRole() == 'ADMIN';
  }
}
