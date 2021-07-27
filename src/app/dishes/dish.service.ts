
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../interfaces/dish.interface';
import { Favourite } from '../interfaces/favourite.interface';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private dishes: Dish[] = [];
  private specialDishes: Dish[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit(): void {


  }
  getDishes(): Dish[] {
    return this.dishes;
  }
  setDishes(dishes: Dish[]) {
    this.dishes = dishes;
  }
  getspecialDishes(): Dish[] {
    return this.specialDishes;
  }
  setspecialDishes(dishes: Dish[]) {
    this.specialDishes = dishes;

  }


  getRegularDishes() {

    return this.http.get<{ dishes: Dish[] }>(`${environment.backend}/dishes/regular`);


  }
  getSpecialDishes() {

    return this.http.get<{ dishes: Dish[] }>(`${environment.backend}/dishes/special`);

  }

  addToFavouriteDishesList(id: string) {
    return this.http.post<{ message: string }>(`${environment.backend}/favourites`, { favDish: id });

  }
  getFavouriteDishes() {
    return this.http.get<{ favourites: Favourite[] }>(`${environment.backend}/favourites`);

  }
  removeFromFavoriteDishes(id: string) {
    return this.http.delete<{ message: string }>(`${environment.backend}/favourites/${id}`);

  }
 

}
