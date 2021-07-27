import { Component, OnInit } from '@angular/core';
import { Dish } from '../interfaces/dish.interface';
import { AuthService } from '../signup/auth.service';
import { DishService } from './dish.service';
import { CartService } from '../cart/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

declare const swal;
declare const M;

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {
  count: number = 0;
  user:{
    name:string;
    email:string;
    _id:string;
  }
  dishes: Dish[] = [];
  specialDishes: Dish[] = [];
  special: boolean = false;
  isLoading: boolean = false;
  isLoading2: boolean = false;
  error: string = null;
  isLogin: boolean = false;
  toCart: boolean = false;

  constructor(private dishService: DishService, private authService: AuthService, private cartService: CartService
    , private router: Router) {


    this.getRegularDishes();
  }

  ngOnInit(): void {



    let d = new Date();
    let day: number = d.getDay();
    console.log(day, "hello");
    if (day === 5 || day === 6) {

      this.special = true;
    }

    if (this.special) {
      setTimeout(() => {
        this.getSpecialDishes();
      }, 1000);

    }


    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);

    //Check whether authorized or not...
    this.authService.isAutorized.subscribe((login) => {
      this.isLogin = login;
    })
 
    if (this.isLogin===false) {
        swal("You Might Not Be Able To Buy Food", "..Please Login."); 
    }

  }

  getRegularDishes() {
    this.isLoading = true;
    this.dishService.getRegularDishes().subscribe((response) => {
      this.isLoading = false;

      console.log(response);
      this.dishService.setDishes(response.dishes);
      response.dishes.map((dish) => {
        this.dishes.push(dish);


      });

    }, (err) => {
      this.isLoading = false;
      this.error = err.message;
      swal({
        title: "Oops",
        text: err.error.message,
        icon: "error",
        button: "Ok",
      });
    });

  }
  getSpecialDishes() {
    this.isLoading2 = true;
    this.dishService.getSpecialDishes().subscribe((response) => {
      this.isLoading2 = false;

      console.log(response);
      this.dishService.setspecialDishes(response.dishes);
      response.dishes.map((dish) => {
        this.specialDishes.push(dish);


      });

    }, (err) => {
      this.isLoading2 = false;
      this.error = err.message;
      swal({
        title: "Oops",
        text: err.error.message,
        icon: "error",
        button: "Ok",
      });
    });

  }
  //Add To Cart....
  onAddToCart(dish: Dish) {
    
    swal("Loading...");
    this.cartService.addDishToCart(dish).subscribe((response) => {

      this.router.navigate(['/cart']);
      swal({
        title: "Success",
        text: response.message,
        icon: "success",
        button: "Ok",
      });
      this.toCart = true;

    }, (err) => {
      console.log(err);
      swal({
        title: "Oops",
        text: err.error.message,
        icon: "error",
        button: "Ok",
      });
    });


  }
  //Add To Favoourites.......
  onAddToFavourite(id: string) {
    
    swal("Loading.......");
    console.log(id);
    this.dishService.addToFavouriteDishesList(id).subscribe((response) => {
      swal({
        title: "Success",
        text: response.message,
        icon: "success",
        button: "Ok",
      });

    }, (err) => {
      console.log(err);
      swal({
        title: "Oops",
        text: err.error.message,
        icon: "error",
        button: "Ok",
      });
    });


  }





}
