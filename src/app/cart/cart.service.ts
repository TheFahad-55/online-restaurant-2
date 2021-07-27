import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../interfaces/cart.interface';
import { Dish } from '../interfaces/dish.interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carts: Cart[] = [];
  cartCount = new BehaviorSubject(this.getCarts().length);
  bill = new BehaviorSubject(false);
  constructor(private http: HttpClient) { }
  ngOnInit(): void {


  }
  getCarts(): Cart[] {
    return this.carts;
  }
  setCarts(carts: Cart[]) {
    this.carts = carts;
  }

  addDishToCart(dish: Dish) {
    return this.http.post<{ message: string }>(`${environment.backend}/cart`, { dish: dish });

  }
  getCartItems() {
    return this.http.get<{ carts: Cart[] }>(`${environment.backend}/cart`);
  }
  increaseCart(id: string) {
    return this.http.get<{ message: string }>(`${environment.backend}/cart/items/${id}`);

  }
  decreaseCart(id: string) {
    return this.http.get<{ message: string }>(`${environment.backend}/cart/${id}`);

  }
  removeFromTheCart(id: string) {
    return this.http.delete<{ message: string }>(`${environment.backend}/cart/${id}`);

  }
  emptyCart() {
    return this.http.delete<{ message: string }>(`${environment.backend}/cart`);
  }



}
